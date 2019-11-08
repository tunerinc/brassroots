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

class UserPreferencesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Value(0),
      tempPlaylist: '',
      tempSession: '',
      tempMessage: '',
    };

    this.setSetting = this.setSetting.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
  }

  componentDidMount() {
    const {settings: {preference}} = this.props;

    this.setState({
      tempPlaylist: preference.playlist,
      tempSession: preference.session,
      tempMessage: preference.message,
    });
  }

  componentWillUnmount() {
    const {tempPlaylist, tempSession, tempMessage} = this.state;
    const {settings: {preference: {playlist, session, message}}} = this.props;

    if (tempPlaylist !== playlist || tempSession !== session || tempMessage !== message) {
      this.handleSaveSettings();
    }
  }

  setSetting = updates => () => this.setState({...updates});

  handleSaveSettings() {
    const {tempPlaylist, tempSession, tempMessage} = this.state;
    const {saveSettings, users: {currentUserID}} = this.props;

    saveSettings(
      {
        id: currentUserID,
        preference: {
          playlist: tempPlaylist,
          session: tempSession,
          message: tempMessage,
        },
      },
    );
  }

  render() {
    const {y, tempPlaylist, tempSession, tempMessage} = this.state;
    const opacity = (setting, option) => setting === option ? 1 : 0;
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Preferences</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <Animated.ScrollView style={styles.wrap} onScroll={onScroll({y})} scrollEventThrottle={1}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>PLAYLISTS I CREATE ARE AUTOMATICALLY</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempPlaylist: 'hidden'})}
              >
                <Text style={styles.sectionOptionText}>hidden</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempPlaylist, 'hidden')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempPlaylist: 'vip'})}
              >
                <Text style={styles.sectionOptionText}>vip</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempPlaylist, 'vip')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempPlaylist: 'limitless'})}
              >
                <Text style={styles.sectionOptionText}>limitless</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempPlaylist, 'limitless')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>MY LIVE SESSIONS ARE AUTOMATICALLY</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempSession: 'dj'})}
              >
                <Text style={styles.sectionOptionText}>dj mode</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[styles.optionCheck, {opacity: opacity(tempSession, 'dj')}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempSession: 'radio'})}
              >
                <Text style={styles.sectionOptionText}>radio mode</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[styles.optionCheck, {opacity: opacity(tempSession,  'radio')}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempSession: 'party'})}
              >
                <Text style={styles.sectionOptionText}>party mode</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[styles.optionCheck, {opacity: opacity(tempSession, 'party')}]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>RECEIVE MESSAGES FROM</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempMessage: 'following'})}
              >
                <Text style={styles.sectionOptionText}>following</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempMessage, 'following')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity
                style={styles.sectionOptionWrap}
                onPress={this.setSetting({tempMessage: 'anyone'})}
              >
                <Text style={styles.sectionOptionText}>anyone</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(tempMessage, 'anyone')},
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

UserPreferencesView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPreferencesView);