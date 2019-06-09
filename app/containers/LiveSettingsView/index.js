'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LiveSettingOption from '../../components/LiveSettingOption';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sessions Action Creators
import {changeSessionMode} from '../../actions/sessions/ChangeSessionMode';

class LiveSettingsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedMode: ''};

    this.onScroll = this.onScroll.bind(this);
    this.navBack = this.navBack.bind(this);
    this.save = this.save.bind(this);
    this.selectMode = this.selectMode.bind(this);
    
    this.shadowOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const {sessions: {currentSessionID, sessionsByID}} = this.props;
    const {mode: selectedMode} = sessionsByID[sessionID];
    this.setState({selectedMode});
  }

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

  navBack() {
    const {selectedMode} = this.state;
    const {
      changeSessionMode,
      sessions: {currentSessionID, sessionsByID},
      users: {currentUserID},
    } = this.props;
    const {ownerID, mode} = sessionsByID[currentSessionID];
    
    Actions.pop();

    if (ownerID === currentUserID && mode !== selectedMode) {
      changeSessionMode(currentSessionID, selectedMode);
    }
  }

  save() {
    const {selectedMode} = this.state;
    const {changeSessionMode, sessions: {currentSessionID}} = this.props;
    changeSessionMode(currentSessionID, selectedMode);
  }

  selectMode = mode => () => {
    this.setState({selectedMode: mode});
  }

  render() {
    const animatedHeaderStyle = { shadowOpacity: this.shadowOpacity };
    const {selectedMode} = this.state;
    const {
      sessions: {currentSessionID, sessionsByID, changingMode},
      users: {currentUserID},
    } = this.props;
    const {ownerID, mode} = sessionsByID[currentSessionID];

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={this.navBack}
            />
            {ownerID === currentUserID && <Text style={styles.title}>Change Mode</Text>}
            {ownerID !== currentUserID && <Text style={styles.title}>Live Settings</Text>}
            <TouchableOpacity
              style={styles.rightIconButton}
              onPress={this.save}
              disabled={ownerID !== currentUserID || selectedMode === mode}
            >
              {ownerID === currentUserID && !changingMode &&
                <Text
                  style={[
                    styles.rightIconText,
                    {color: selectedMode === mode ? '#888' : '#fefefe'},
                  ]}
                >save</Text>
              }
              {ownerID === userID && changingMode &&
                <Text
                  style={[
                    styles.rightIconText,
                    {color: '#888'},
                  ]}
                >saving</Text>
              }
            </TouchableOpacity>
          </View>
        </Animated.View>
        <ScrollView style={styles.settingsWrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          <View>
            <LiveSettingOption
              mode='dj'
              selected={selectedMode === 'dj'}
              selectMode={this.selectMode}
              ownerID={ownerID}
              currentUserID={currentUserID}
            />
            <LiveSettingOption
              mode='radio'
              selected={selectedMode === 'radio'}
              selectMode={this.selectMode}
              ownerID={ownerID}
              currentUserID={currentUserID}
            />
            <LiveSettingOption
              mode='party'
              selected={selectedMode === 'party'}
              selectMode={this.selectMode}
              ownerID={ownerID}
              currentUserID={currentUserID}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

LiveSettingsView.propTypes = {
  changeSessionMode: PropTypes.func.isRequired,
  sessions: PropTypes.object,
  settings: PropTypes.object,
  title: PropTypes.string,
  users: PropTypes.object,
};

function mapStateToProps({sessions, settings, users}) {
  return {
    sessions,
    settings,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeSessionMode,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSettingsView);