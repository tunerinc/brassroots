'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Spotify from 'rn-spotify-sdk';
import BackgroundTimer from 'react-native-background-timer';
import TextTicker from 'react-native-text-ticker';
import styles from './styles';
import TabIcon from '../TabIcon';
import MiniPlayer from '../MiniPlayer';

// Player Action Creators
import {nextTrack} from '../../actions/player/NextTrack';
import {pausePlayer} from '../../actions/player/PausePlayer';
import {startPlayer} from '../../actions/player/StartPlayer';
import {stopPlayer} from '../../actions/player/StopPlayer';
import {togglePause} from '../../actions/player/TogglePause';
import {updatePlayer} from '../../actions/player/UpdatePlayer';

class PlayerTabBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coverOpacity: new Animated.Value(1),
      shadowOpacity: new Animated.Value(0),
      coverIndex: new Animated.Value(2),
    };

    this.setProgress = this.setProgress.bind(this);
    this.handleDoneTrack = this.handleDoneTrack.bind(this);
    this.hideCover = this.hideCover.bind(this);
    this.navToProfile = this.navToProfile.bind(this);
    this.createButton = this.createButton.bind(this);
    this.nav = this.nav.bind(this);
    this.handleTogglePause = this.handleTogglePause.bind(this);

    this.progressInterval;
    this.startedBackgroundTimer = false;
    this.intervalActive = false;
    this.tabBarBGColor = '#28282b'
  }

  componentDidMount() {
    Spotify.on('play', () => {
      if (!this.startedBackgroundTimer) {
        BackgroundTimer.start();
        this.startedBackgroundTimer = true;
      }

      if (typeof this.progressInterval !== 'number') {
        this.progressInterval = setInterval(this.setProgress, 985);
      }
    });

    Spotify.on('pause', () => {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    });

    Spotify.on('trackDelivered', this.handleDoneTrack);
    this.hideCover();
  }

  componentDidUpdate(prevProps) {
    const {
      pausePlayer,
      startPlayer,
      updatePlayer,
      entities: {sessions},
      player: {
        paused,
        seeking,
        progress,
        durationMS,
        currentQueueID,
        skippingPrev,
        skippingNext,
        error: playerError,
      },
      queue: {context},
      sessions: {currentSessionID},
      tracks: {fetching, error: tracksError},
      users: {currentUserID},
    } = this.props;
    const {
      entities: {sessions: oldSessions},
      sessions: {currentSessionID: oldSessionID},
      tracks: {fetching: oldFetching},
      queue: {context: oldContext},
      player: {
        paused: oldPaused,
        seeking: oldSeeking,
        progress: oldProgress,
        durationMS: oldDuration,
        currentQueueID: oldCurrentID,
        skippingPrev: oldSkippingPrev,
        skippingNext: oldSkippingNext,
      },
    } = prevProps;
    const currentSession = sessions.byID[currentSessionID];
    const oldSession = oldSessions.byID[currentSessionID];

    if (currentSession && this.tabBarBGColor !== 'rgba(27,27,30,0.7)') {
      this.tabBarBGColor = 'rgba(27,27,30,0.7)';
    }

    if (!currentSessionID && this.tabBarBGColor !== '#28282b') {
      this.tabBarBGColor = '#28282b';
    }

    if (
      !playerError
      && !paused
      && (
        (oldSkippingPrev && !skippingPrev) || (oldSkippingNext && !skippingNext)
      )
    ) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
      this.progressInterval = setInterval(this.setProgress, 985);
    }

    if (currentSession && currentUserID !== currentSession.ownerID) {
      if (
        oldSession
        && (
          oldSession.progress !== currentSession.progress
          || oldSession.currentTrackID !== currentSession.currentTrackID
        )
      ) {
        updatePlayer({progress: currentSession.progress});

        if (!paused) {
          startPlayer(
            currentSessionID,
            currentUserID,
            currentSession.currentTrackID,
            currentSession.progress / 1000,
          );
        }
      }

      if (
        (
          (!oldSessionID || oldSessionID !== currentSessionID)
          && typeof progress === 'number'
          && durationMS !== 0
          && !paused
        )
        || (oldSeeking && !seeking)
        || (oldPaused && !paused)
      ) {
        startPlayer(currentSessionID, currentUserID, currentSession.currentTrackID, progress / 1000);
      }
  
      if (
        currentSession
        && !seeking
        && !oldPaused
        && paused
      ) {
        pausePlayer(currentSessionID, currentUserID, oldProgress);
      }
    }
  }

  componentWillUnmount() {
    Spotify.removeAllListeners();
    clearInterval(this.progressInterval);
    this.progressInterval = null;
    this.startedBackgroundTimer = false;
    BackgroundTimer.stop();
  }

  setProgress() {
    const {updatePlayer, player: {progress, seeking, durationMS}} = this.props;
    if (typeof progress === 'number' && !seeking) updatePlayer({progress: progress + 1000});
  }

  handleDoneTrack() {
    const {
      nextTrack,
      stopPlayer,
      entities: {sessions, users},
      player: {nextQueueID, seeking, currentQueueID: current},
      queue: {userQueue, contextQueue, totalQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {displayName, profileImage} = users.byID[currentUserID];
    
    if (currentSessionID && sessions.allIDs.includes(currentSessionID)) {
      const {ownerID, totalPlayed, totalListeners: totalUsers} = sessions.byID[currentSessionID];

      clearInterval(this.progressInterval);
      BackgroundTimer.stop();

      // add seeking edge case when song close to end

      if (ownerID === currentUserID) {
        if (typeof nextQueueID === 'string' && !seeking) {
          nextTrack(
            {displayName, profileImage, id: currentUserID},
            {totalQueue, totalPlayed, totalUsers, current, id: currentSessionID},
            nextQueueID,
          );
        } else {
          stopPlayer(currentSessionID);
        }
      }
    }
  }

  hideCover() {
    const {coverOpacity, shadowOpacity, coverIndex} = this.state;

    if (coverOpacity !== 0) {
      Animated.sequence([
        Animated.timing(coverOpacity, {
          toValue: 0,
          duration: 300,
          delay: 300,
          easing: Easing.lienar,
        }),
        Animated.timing(shadowOpacity, {
          toValue: 0.25,
          duration: 300,
          delay: 300,
          easing: Easing.linear,
        }),
        Animated.timing(coverIndex, {
          toValue: -2,
          duration: 1,
          delay: 600,
          easing: Easing.linear,
        })
      ]).start();
    }
  }

  navToProfile() {
    const {
      entities: {sessions},
      sessions: {currentSessionID},
    } = this.props;
    const currentSession = sessions.byID[currentSessionID];

    // if (currentSession) {
    //   Actions.libProMain({userToView: currentSession.ownerID});
    // }
  }

  createButton({routeName}) {
    const {navigation: {state: {index}}} = this.props;

    return (
      <TouchableOpacity style={styles.tabButton} onPress={this.nav(routeName)} key={routeName}>
        <TabIcon routeName={routeName} routeIndex={index} />
      </TouchableOpacity>
    );
  }

  nav = routeName => () => {
    const {navigation: {navigate}} = this.props;
    navigate(routeName);
  }

  handleTogglePause() {
    const {
      togglePause,
      entities: {sessions},
      player: {paused, currentTrackID, progress},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (sessions.allIDs.includes(currentSessionID)) {
      const {ownerID} = sessions.byID[currentSessionID];

      togglePause(
        currentUserID,
        ownerID,
        {progress, id: currentSessionID, current: currentTrackID},
        !paused,
      );
    }
  }

  render() {
    const {coverOpacity, shadowOpacity, coverIndex} = this.state;
    const animatedCover = {opacity: coverOpacity, zIndex: coverIndex};
    const animatedBGColor = {backgroundColor: this.tabBarBGColor};
    const {
      entities: {albums, sessions, tracks, users},
      navigation: {state: {routes}},
      player: {currentTrackID, durationMS, paused, progress},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const session = sessions.byID[currentSessionID];
    const track = tracks.byID[currentTrackID];

    return (
      <Animated.View style={[styles.container, {shadowOpacity}]}>
        {(track && session) &&
          <View style={styles.wrap}>
            <View style={styles.playerBackgroundWrap}>
              <Image
                style={styles.playerBackgroundImage}
                resizeMode='cover'
                blurRadius={90}
                source={{uri: track.album.large}}
              />
            </View>
            <MiniPlayer
              openPlayer={Actions.liveSession}
              navToProfile={this.navToProfile}
              togglePause={this.handleTogglePause}
              progress={progress}
              durationMS={durationMS}
              profileImage={users.byID[session.ownerID].profileImage}
              name={track.name}
              artists={track.artists.map(a => a.name).join(', ')}
              displayName={users.byID[session.ownerID].displayName}
              paused={paused}
              isOwner={session.ownerID === currentUserID}
            />
          </View>
        }
        <Animated.View style={[styles.tabbar, animatedBGColor]}>
          {routes.map(this.createButton)}
        </Animated.View>
        <Animated.View style={[styles.cover, animatedCover]}></Animated.View>
      </Animated.View>
    );
  }
}

PlayerTabBar.propTypes = {
  entities: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  nextTrack: PropTypes.func.isRequired,
  pausePlayer: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  sessions: PropTypes.object.isRequired,
  startPlayer: PropTypes.func.isRequired,
  stopPlayer: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  title: PropTypes.string,
  updatePlayer: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, player, queue, sessions, tracks, users}) {
  return {
    entities,
    player,
    queue,
    sessions,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    nextTrack,
    pausePlayer,
    startPlayer,
    stopPlayer,
    togglePause,
    updatePlayer,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTabBar);