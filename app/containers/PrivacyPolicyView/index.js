'use strict';

import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, Animated, Easing, RefreshControl} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import Placeholder from 'rn-placeholder';
import styles from './styles';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Legal Action Creators
import {getPolicy} from '../../actions/legal/GetPolicy';

const screenWidth = Dimensions.get('window').width;

class PrivacyPolicyView extends React.Component {
  constructor(props) {
    super(props);

    this.shadowOpacity = new Animated.Value(0);

    this.onScroll = this.onScroll.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const {getPolicy, legal: {privacy: {text}}} = this.props;
    
    if (text === '') {
      getPolicy();
    }
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    if (y > 0) {
      if (this.shadowOpacity != 0.9) {
        Animated.timing(this.shadowOpacity, {
          toValue: 0.9,
          duration: 75,
          easing: Easing.linear,
        }).start();
      };
    } else {
      Animated.timing(this.shadowOpacity, {
        toValue: 0,
        duration: 75,
        easing: Easing.linear,
      }).start()
    }
  }

  handleRefresh() {
    const {getPolicy, legal: {privacy: {fetchingPrivacy, refreshingPrivacy}}} = this.props;

    if (fetchingPrivacy || refreshingPrivacy) return;

    getPolicy(true);
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {legal: {privacy: {text, fetchingPrivacy, refreshingPrivacy, error}}} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Icon
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text style={styles.title}>Privacy Policy</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {fetchingPrivacy && !refreshingPrivacy && text === '' &&
          <View style={styles.spinnerWrap}>
            <Placeholder.Paragraph
              animate='fade'
              lineNumber={25}
              textSize={14}
              lineSpacing={8.4}
              color='#888'
              width='100%'
            />
          </View>
        }
        {(!fetchingPrivacy || refreshingPrivacy) && (text !== '' || error) &&
          <ScrollView
            style={styles.privacyWrap}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={refreshingPrivacy} onRefresh={this.handleRefresh} />
            }
          >
            {error && <Text>Unable to retrieve privacy privacy.</Text>}
            {!error && text !== '' &&
              <HTML
                html={text}
                imagesMaxWidth={screenWidth}
                baseFontStyle={{color: '#fefefe', fontFamily: 'Muli'}}
                tagsStyles={{p: {margin: 0}}}
              />
            }
          </ScrollView>
        }
      </View>
    );
  }
}

PrivacyPolicyView.propTypes = {
  legal: PropTypes.object.isRequired,
  getPolicy: PropTypes.func.isRequired,
};

function mapStateToProps({legal}) {
  return {legal};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getPolicy}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyView);