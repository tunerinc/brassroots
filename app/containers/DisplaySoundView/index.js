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

class DisplaySoundView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Value(0),
      tempSound: false,
      tempTheme: '',
    };

    this.setSound == this.setSound.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
  }

  componentDidMount() {
    const {settings: {soundEffects: tempSound, theme: tempTheme}} = this.props;
    this.setState({tempSound, tempTheme});
  }

  componentWillUnmount() {
    const {tempSound, tempTheme} = this.state;
    const {settings: {theme, soundEffects}} = this.props;
    if (tempSound !== soundEffects || tempTheme !== theme) this.handleSaveSettings();
  }

  setSound = tempSound => () => this.setState({tempSound});

  setTheme = tempTheme => () => this.setState({tempTheme});

  handleSaveSettings() {
    const {tempSound: soundEffects, tempTheme: theme} = this.state;
    const {saveSettings, users: {currentUserID: id}} = this.props;
    saveSettings({id, soundEffects, theme});
  }

  render() {
    const {y, tempSound, tempTheme} = this.state;
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
            <Text style={styles.title}>Display & Sound</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <Animated.ScrollView style={styles.wrap} onScroll={onScroll({y})} scrollEventThrottle={1}>
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
        </Animated.ScrollView>
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