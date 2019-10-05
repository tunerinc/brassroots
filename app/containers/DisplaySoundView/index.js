'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Settings Action Creators
import {saveSettings} from '../../actions/settings/SaveSettings';

class DisplaySoundView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
      tempSound: false,
      tempTheme: '',
    };

    this.setSound == this.setSound.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const {settings: {soundEffects, theme}} = this.props;

    this.setState({
      tempSound: soundEffects,
      tempTheme: theme,
    });
  }

  componentWillUnmount() {
    const {tempSound, tempTheme} = this.state;
    const {settings: {theme, soundEffects}} = this.props;
    if (tempSound !== soundEffects || tempTheme !== theme) this.handleSaveSettings();
  }

  setSound = tempSound => () => {
    this.setState({tempSound});
  }

  setTheme = tempTheme => () => {
    this.setState({tempTheme});
  }

  handleSaveSettings() {
    const {tempSound, tempTheme} = this.state;
    const {saveSettings, users: {currentUserID}} = this.props;

    saveSettings(
      {
        id: currentUserID,
        soundEffects: tempSound,
        theme: tempTheme,
      },
    );
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
    const {shadowOpacity, tempSound, tempTheme} = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Display & Sound</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView style={styles.wrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>SOUND EFFECTS</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} onPress={this.setSound(false)}>
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'
                  style={[styles.optionCheck, {opacity: tempSound ? 0 : 1}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} onPress={this.setSound(true)}>
                <Text style={styles.sectionOptionText}>on</Text>
                <Ionicons
                  name='md-checkmark'
                  style={[styles.optionCheck, {opacity: tempSound ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>THEME</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} onPress={this.setTheme('light')}>
                <Text style={styles.sectionOptionText}>light</Text>
                <Ionicons
                  name='md-checkmark'
                  style={[styles.optionCheck, {opacity: tempTheme === 'light' ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} onPress={this.setTheme('dark')}>
                <Text style={styles.sectionOptionText}>dark</Text>
                <Ionicons
                  name='md-checkmark'
                  style={[styles.optionCheck, {opacity: tempTheme === 'dark' ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

DisplaySoundView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySoundView);