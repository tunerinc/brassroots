'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {onScroll} from 'react-native-redash';
import Animated from 'react-native-reanimated';

// Styles
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Settings Action Creators
import {saveSettings} from '../../actions/settings/SaveSettings';

const {Value, interpolate, Extrapolate} = Animated;

class UserNotificationsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Value(0),
      tempSession: '',
      tempChat: '',
      tempMessage: true,
      tempGroup: '',
      tempNearby: '',
      tempChange: true,
      tempJoin: true,
      tempLike: true,
      tempFollow: true,
    };

    this.setSetting = this.setSetting.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
  }

  componentDidMount() {
    const {settings: {notify}} = this.props;

    this.setState({
      tempSession: notify.session,
      tempChat: notify.chat,
      tempMessage: notify.message,
      tempGroup: notify.groupMessage,
      tempNearby: notify.nearbySession,
      tempChange: notify.playlistChange,
      tempJoin: notify.playlistJoin,
      tempLike: notify.likedTrack,
      tempFollow: notify.newFollower,
    });
  }

  componentWillUnmount() {
    const {
      tempSession,
      tempChat,
      tempMessage,
      tempGroup,
      tempNearby,
      tempChange,
      tempJoin,
      tempLike,
      tempFollow,
    } = this.state;
    const {settings: {notify}} = this.props;

    if (
      tempSession !== notify.session
      || tempChat !== notify.chat
      || tempMessage !== notify.message
      || tempGroup !== notify.groupMessage
      || tempNearby !== notify.nearbySession
      || tempChange !== notify.playlistChange
      || tempJoin !== notify.playlistJoin
      || tempLike !== notify.likedTrack
      || tempFollow !== notify.newFollower
    ) {
      this.handleSaveSettings();
    }
  }

  setSetting = updates => () => this.setState({...updates});

  handleSaveSettings() {
    const {
      tempSession,
      tempChat,
      tempMessage,
      tempGroup,
      tempNearby,
      tempChange,
      tempJoin,
      tempLike,
      tempFollow,
    } = this.state;

    const {saveSettings, users: {currentUserID}} = this.props;

    saveSettings(
      {
        id: currentUserID,
        notify: {
          session: tempSession,
          chat: tempChat,
          message: tempMessage,
          groupMessage: tempGroup,
          nearbySession: tempNearby,
          playlistChange: tempChange,
          playlistJoin: tempJoin,
          likedTrack: tempLike,
          newFollower: tempFollow,
        },
      },
    );
  }

  render() {
    const {
      y,
      tempSession,
      tempChat,
      tempMessage,
      tempGroup,
      tempNearby,
      tempChange,
      tempJoin,
      tempLike,
      tempFollow,
    } = this.state;
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    const opacity = (setting, option) => {
      if (typeof setting === 'boolean') {
        if (option === 'off' && !setting) return 1;
        if (option === 'off' && setting) return 0;
        if (option === 'on' && setting) return 1;
        if (option === 'on' && !setting) return 0;
      } else {
        if (setting === option) return 1;
        if (setting !== option) return 0;
      }
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <Animated.ScrollView style={styles.wrap} onScroll={onScroll({y})} scrollEventThrottle={1}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>LIVE SESSIONS</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempSession: 'off'})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempSession, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempSession: 'following'})}
              >
                <Text style={styles.sectionOptionText}>following</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempSession, 'following')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>LIVE SESSION CHAT</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempChat: 'off'})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempChat, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempChat: 'mentions'})}
              >
                <Text style={styles.sectionOptionText}>mentions</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempChat, 'mentions')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempChat: 'all'})}
              >
                <Text style={styles.sectionOptionText}>all chat messages</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempChat, 'all')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>DIRECT MESSAGES</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempMessage: false})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempMessage, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempMessage: true})}
              >
                <Text style={styles.sectionOptionText}>on</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempMessage, 'on')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>GROUP DIRECT MESSAGES</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempGroup: 'off'})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempGroup, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempGroup: 'mentions'})}
              >
                <Text style={styles.sectionOptionText}>mentions</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempGroup, 'mentions')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempGroup: 'all'})}
              >
                <Text style={styles.sectionOptionText}>all messages</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempGroup, 'all')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>NEARBY LIVE SESSIONS</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempNearby: 'off'})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempNearby, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempNearby: 'following'})}
              >
                <Text style={styles.sectionOptionText}>following</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempNearby, 'following')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempNearby: 'all'})}
              >
                <Text style={styles.sectionOptionText}>all nearby sessions</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempNearby, 'all')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>PLAYLIST CHANGES</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempChange: false})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempChange, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempChange: true})}
              >
                <Text style={styles.sectionOptionText}>on</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempChange, 'on')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>PLAYLIST JOINS</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempJoin: false})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempJoin, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempJoin: true})}
              >
                <Text style={styles.sectionOptionText}>on</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempJoin, 'on')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>LIKED SONGS</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempLike: false})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempLike, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempLike: true})}
              >
                <Text style={styles.sectionOptionText}>on</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempLike, 'on')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>NEW FOLLOWERS</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempFollow: false})}
              >
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempFollow, 'off')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempFollow: true})}
              >
                <Text style={styles.sectionOptionText}>on</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempFollow, 'on')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

UserNotificationsView.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({settings, users}) {
  return {
    settings,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({saveSettings}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotificationsView);