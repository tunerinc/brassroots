'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View, Image, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

// Styles
import styles from './styles';

// Users Action Creators
import {authorizeUser} from '../../actions/settings/AuthUser';
import {initializeSpotify} from '../../actions/settings/InitializeSpotify';

class WelcomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attemptedToInitialize: false,
      loadingIndex: new Animated.Value(1),
      loadingOpacity: new Animated.Value(1),
    };
  }

  componentDidMount() {
    const {attemptedToInitialize} = this.state;
    const {initializeSpotify, settings: {initialized}} = this.props;

    if (!attemptedToInitialize && !initialized) {
      this.setState({attemptedToInitialize: true});
      setTimeout(initializeSpotify, 100);
    }
  }

  componentDidUpdate(prevProps) {
    const {loadingOpacity, loadingIndex} = this.state;
    const {settings: {initializing: oldInitializing}} = prevProps;
    const {settings: {initializing, loggedIn, initialized}, users: {currentUserID}} = this.props;
  
    if (
      ((oldInitializing && !initializing) || initialized)
      && (currentUserID === '' || typeof currentUserID !== 'string')
      && !loggedIn
    ) {
      Animated.sequence([
        Animated.timing(loadingOpacity,
          {
            toValue: 0,
            duration: 150,
            delay: 3133,
            easing: Easing.linear,
          }
        ),
        Animated.timing(loadingIndex,
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
    const {loadingIndex, loadingOpacity} = this.state;
    const {authorizeUser} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.loading,
          {
            zIndex: loadingIndex,
            opacity: loadingOpacity,
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
            <Text allowFontScaling={false} style={styles.footText}>By logging in, you agree to the </Text>
            <Text
              allowFontScaling={false}
              style={styles.footLink}
              onPress={Actions.welTermsService}
            >Terms of Service</Text>
            <Text allowFontScaling={false} style={styles.footText}> and </Text>
            <Text
              allowFontScaling={false}
              style={styles.footLink}
              onPress={Actions.welPrivacyPolicy}
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
  return {
    settings,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    authorizeUser,
    initializeSpotify,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView);