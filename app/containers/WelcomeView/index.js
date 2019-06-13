'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View, Image, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Users Action Creators
import {authorizeUser} from '../../actions/settings/AuthUser';
import {initializeSpotify} from '../../actions/settings/InitializeSpotify';

class WelcomeView extends React.Component {
  constructor(props) {
    super(props);

    this.attemptedToInitialize = false;
    this.loadingIndex = new Animated.Value(1);
    this.loadingOpacity = new Animated.Value(1);
  }

  componentDidMount() {
    const {initializeSpotify, settings: {initialized}} = this.props;

    if (!this.attemptedToInitialize && !initialized) {
      this.attemptedToInitialize = true;
      initializeSpotify();
    }
  }

  componentDidUpdate(prevProps) {
    const {settings: {initializing: oldInitializing}} = prevProps;
    const {settings: {initializing, loggedIn}, users: {currentUserID}} = this.props;
  
    if (oldInitializing && !initializing && currentUserID === '' && !loggedIn) {
      Animated.sequence([
        Animated.timing(this.loadingOpacity,
          {
            toValue: 0,
            duration: 150,
            delay: 3133,
            easing: Easing.linear,
          }
        ),
        Animated.timing(this.loadingIndex,
          {
            toValue: -1,
            duration: 1,
            delay: 300,
            easing: Easing.linear,
          }
        )
      ]).start();
    }
  }
  
  render() {
    const {authorizeUser} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.loading,
          {
            zIndex: this.loadingIndex,
            opacity: this.loadingOpacity,
          }
        ]}>
          <Image style={styles.loadingGif} source={require('../../images/loading.gif')} />
        </Animated.View>
        <Image style={styles.logo} source={require('../../images/logo.png')} />
        <TouchableHighlight style={styles.button} onPress={authorizeUser}>
          <Text style={styles.text}>LOGIN WITH SPOTIFY</Text>
        </TouchableHighlight>
        <View style={styles.footnoteWrap}>
          <View style={styles.footnote}>
            <Text style={styles.footText}>By tapping the button above, you agree to the </Text>
            <Text
              style={styles.footLink}
              onPress={Actions.welcomeTermsOfService}
            >Terms of Service</Text>
            <Text style={styles.footText}> and </Text>
            <Text
              style={styles.footLink}
              onPress={Actions.welcomePrivacyPolicy}
            >Privacy Policy.</Text>
          </View>
        </View>
      </View>
    );
  }
}

WelcomeView.propTypes = {
  settings: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  authorizeUser: PropTypes.func.isRequired,
  initializeSpotify: PropTypes.func.isRequired,
};

function mapStateToProps({settings, users}) {
  return {settings, users};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    authorizeUser,
    initializeSpotify,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView);