'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LoadingConversation from '../../components/LoadingConversation';
import LoadingNotification from '../../components/LoadingNotification';
import styles from './styles';

class SocialTabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewing: 'notifications',
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.toggleViewingScreen = this.toggleViewingScreen.bind(this);
  };

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    const {shadowOpacity} = this.state;

    if (y > 0) {
      if (shadowOpacity !== 0.9) {
        Animated.timing(shadowOpacity, {
          toValue: 0.9,
          duration: 75,
          easing: Easing.linear,
        }).start();
      };
    } else {
      Animated.timing(shadowOpacity, {
        toValue: 0,
        duration: 75,
        easing: Easing.linear,
      }).start()
    }
  }

  toggleViewingScreen() {
    const {viewing} = this.state;
    this.setState({viewing: viewing === 'notifications' ? 'messages' : 'notifications'});
  }

  render() {
    const {viewing, shadowOpacity} = this.state;
    const {conversations: {fetching, totalUserConversations}} = this.props;
    const notifColor = viewing === 'notifications' ? '#fefefe' : '#888';
    const messageColor = viewing === 'messages' ? '#fefefe' : '#888';

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={this.toggleViewingScreen}
              disabled={viewing === 'notifications'}
            >
              <Text style={[styles.navButtonText, {color: notifColor}]}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={this.toggleViewingScreen}
              disabled={viewing === 'messages'}
            >
              <Text style={[styles.navButtonText, {color: messageColor}]}>Messages</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <ScrollView style={styles.socialWrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          {viewing === 'notifications' &&
            <Animated.View
              style={[
                styles.notificationsWrap,
                {opacity: this.notificationsOpacity, zIndex: this.notificationsIndex},
              ]}
            >
              <View>
                <LoadingNotification />
                <LoadingNotification />
                <LoadingNotification />
                <LoadingNotification />
                <LoadingNotification />
                <LoadingNotification />
                <LoadingNotification />
                <LoadingNotification />
              </View>
            </Animated.View>
          }
          {viewing === 'messages' &&
            <Animated.View style={[styles.messagesWrap, {opacity: this.messagesOpacity}]}>
              {fetching.includes('conversations') &&
                <View>
                  {totalConversations !== 0 && <Text>We have stuff</Text>}
                  {totalConversations === 0 && <Text>Nothing to show</Text>}
                </View>
              }
              {!fetching.includes('conversations') &&
                <View>
                  <LoadingConversation />
                  <LoadingConversation />
                  <LoadingConversation />
                  <LoadingConversation />
                  <LoadingConversation />
                  <LoadingConversation />
                  <LoadingConversation />
                  <LoadingConversation />
                </View>
              }
            </Animated.View>
          }
        </ScrollView>
      </View>
    );
  }
}

SocialTabView.propTypes = {
  conversations: PropTypes.object.isRequired,
};

function mapStateToProps({conversations}) {
  return {conversations};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialTabView);