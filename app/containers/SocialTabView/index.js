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
    };

    this.onScroll = this.onScroll.bind(this);
    this.toggleViewingScreen = this.toggleViewingScreen.bind(this);

    this.shadowOpacity = new Animated.Value(0);
  };

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    if ((y > 0 && this.shadowOpacity === 0) || (y <= 0 && this.shadowOpacity === 0.9)) {
      Animated.timing(
        this.shadowOpacity,
        {
          toValue: y > 0 ? 0.9 : 0,
          duration: 230,
          easing: Easing.linear,
        }
      ).start();
    }
  }

  toggleViewingScreen() {
    const {viewing} = this.state;
    this.setState({viewing: viewing === 'notifications' ? 'messages' : 'notifications'});
  }

  render() {
    const animatedHeaderStyle = { shadowOpacity: this.shadowOpacity };
    const {viewing} = this.state;
    const {
      conversations: {fetchingConversations, totalConversations},
      notifications: {fetchingNotifications},
    } = this.props;
    const notifColor = viewing === 'notifications' ? '#fefefe' : '#888';
    const messageColor = viewing === 'messages' ? '#fefefe' : '#888';

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <TouchableOpacity style={styles.navButton} onPress={this.toggleViewingScreen}>
              <Text
                style={[
                  styles.navButtonText,
                  {color: notifColor},
                ]}
              >Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={this.toggleViewingScreen}>
              <Text
                style={[
                  styles.navButtonText,
                  {color: messageColor},
                ]}
              >Messages</Text>
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
              {fetchingNotifications &&
                <View>
                  <Text>We might have stuff here</Text>
                </View>
              }
              {!fetchingNotifications &&
                <View>
                  <LoadingNotification />
                  <LoadingNotification />
                  <LoadingNotification />
                  <LoadingNotification />
                </View>
              }
            </Animated.View>
          }
          {viewing === 'messages' &&
            <Animated.View style={[styles.messagesWrap, {opacity: this.messagesOpacity}]}>
              <TouchableOpacity style={styles.newMessageButton} onPress={Actions.socialNewMessage}>
                <Text style={styles.newMessageButtonText}>NEW MESSAGE</Text>
              </TouchableOpacity>
              {fetchingConversations &&
                <View>
                  {totalConversations !== 0 && <Text>We have stuff</Text>}
                  {totalConversations === 0 && <Text>Nothing to show</Text>}
                </View>
              }
              {!fetchingConversations &&
                <View>
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
  notifications: PropTypes.object.isRequired,
};

function mapStateToProps({conversations, notifications}) {
  return {
    conversations,
    notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialTabView);