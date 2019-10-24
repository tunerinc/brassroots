'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  InteractionManager,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Settings Action Creators
import {saveSettings} from '../../actions/settings/SaveSettings';

class UserPreferencesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
      tempPlaylist: '',
      tempSession: '',
      tempMessage: '',
    };

    this.setSetting = this.setSetting.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const {settings: {preference}} = this.props;

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        tempPlaylist: preference.playlist,
        tempSession: preference.session,
        tempMessage: preference.message,
      });
    });
  }

  componentWillUnmount() {
    const {tempPlaylist, tempSession, tempMessage} = this.state;
    const {settings: {preference: {playlist, session, message}}} = this.props;

    InteractionManager.runAfterInteractions(() => {
      if (tempPlaylist !== playlist || tempSession !== session || tempMessage !== message) {
        this.handleSaveSettings();
      }
    });
  }

  navBack = () => InteractionManager.runAfterInteractions(Actions.pop);

  setSetting = updates => () => {
    InteractionManager.runAfterInteractions(() => this.setState({...updates}));
  }

  handleSaveSettings() {
    const {tempPlaylist, tempSession, tempMessage} = this.state;
    const {saveSettings, users: {currentUserID}} = this.props;

    InteractionManager.runAfterInteractions(() => {
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
    });
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    const {shadowOpacity} = this.state;

    if (y > 0) {
      if (shadowOpacity != 0.9) {
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

  render() {
    const {shadowOpacity, tempPlaylist, tempSession, tempMessage} = this.state;
    const opacity = (setting, option) => setting === option ? 1 : 0;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={this.navBack} />
            <Text style={styles.title}>Preferences</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView style={styles.wrap} onScroll={this.onScroll} scrollEventThrottle={16}>
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
        </ScrollView>
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