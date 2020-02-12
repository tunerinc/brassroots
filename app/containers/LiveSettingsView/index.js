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
import {saveSession} from '../../actions/sessions/SaveSession';

class LiveSettingsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMode: '',
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.save = this.save.bind(this);
    this.selectMode = this.selectMode.bind(this);
  }

  componentDidMount() {
    const {
      entities: {sessions},
      sessions: {currentSessionID},
    } = this.props;
    const {mode: selectedMode} = sessions.byID[sessionID];
    this.setState({selectedMode});
  }

  componentWillUnmount() {
    const {selectedMode} = this.state;
    const {
      entities: {sessions},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {ownerID, mode} = sessions.byID[currentSessionID];
    if (ownerID === currentUserID && mode !== selectedMode) this.save();
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

  save() {
    const {selectedMode: mode} = this.state;
    const {saveSession, sessions: {currentSessionID}} = this.props;
    saveSession(currentSessionID, {mode});
  }

  selectMode = selectedMode => () => this.setState({selectedMode});

  render() {
    const {selectedMode, shadowOpacity} = this.state;
    const {
      entities: {sessions},
      sessions: {currentSessionID, changingMode},
      users: {currentUserID},
    } = this.props;
    const {ownerID, mode} = sessions.byID[currentSessionID];
    const titleText = ownerID === currentUserID ? 'Change Mode' : 'Live Settings';

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>
              {titleText}
            </Text>
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
              {changingMode &&
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
              selectMode={this.selectMode('dj')}
              ownerID={ownerID}
              currentUserID={currentUserID}
            />
            <LiveSettingOption
              mode='radio'
              selected={selectedMode === 'radio'}
              selectMode={this.selectMode('radio')}
              ownerID={ownerID}
              currentUserID={currentUserID}
            />
            <LiveSettingOption
              mode='party'
              selected={selectedMode === 'party'}
              selectMode={this.selectMode('party')}
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
  saveSession: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  sessions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, sessions, users}) {
  return {
    entities,
    sessions,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({saveSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSettingsView);