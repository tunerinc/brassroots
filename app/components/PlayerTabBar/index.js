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
import {setProgress} from '../../actions/player/SetProgress';
import {startPlayer} from '../../actions/player/StartPlayer';
import {stopPlayer} from '../../actions/player/StopPlayer';
import {togglePause} from '../../actions/player/TogglePause';

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
      player: {
        paused,
        seeking,
        progress,
        currentQueueID,
        skippingPrev,
        skippingNext,
        error: playerError,
      },
      queue: {context},
      sessions: {currentSessionID, sessionsByID},
      tracks: {fetchingMostPlayed, error: tracksError},
      users: {currentUserID},
    } = this.props;
    const {
      sessions: {sessionsByID: oldSessionsByID, currentSessionID: oldSessionID},
      tracks: {fetchingMostPlayed: oldFetchingMostPlayed},
      player: {
        paused: oldPaused,
        seeking: oldSeeking,
        progress: oldProgress,
        currentQueueID: oldCurrentID,
        skippingPrev: oldSkippingPrev,
        skippingNext: oldSkippingNext,
      },
    } = prevProps;
    const currentSession = sessionsByID[currentSessionID];
    const oldSession = oldSessionsByID[currentSessionID];

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

    if (
      currentSession && currentSession.ownerID !== currentUserID && !paused && context
      && (
        oldPaused
        || !oldSession.context
        || (oldSeeking && !seeking)
        || (oldSession.currentTrackID !== currentSession.currentTrackID)
      )
    ) {
      startPlayer(currentSessionID, currentUserID, currentSession.currentTrackID, progress);
    }

    if (
      currentSession
      && currentSession.ownerID !== currentUserID
      && context
      && !seeking
      && !oldPaused
      && paused
    ) {
      pausePlayer(currentSessionID, currentUserID, oldProgress);
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
    const {setProgress, player: {progress, seeking, durationMS}} = this.props;

    if (typeof progress === 'number' && !seeking) {
      setProgress(progress + 1000);
    }
  }

  handleDoneTrack() {
    const {
      nextTrack,
      stopPlayer,
      player: {nextQueueID, currentQueueID: current},
      queue: {userQueue, contextQueue, totalQueue},
      sessions: {currentSessionID, sessionsByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {displayName, profileImage} = usersByID[currentUserID];
    
    if (currentSessionID && sessionsByID[currentSessionID]) {
      const {ownerID, totalPlayed, totalListeners: totalUsers} = sessionsByID[currentSessionID];

      clearInterval(this.progressInterval);
      BackgroundTimer.stop();

      // add seeking edge case when song close to end

      if (ownerID === currentUserID) {
        if (typeof nextQueueID === 'string') {
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
    const {sessions: {currentSessionID, sessionsByID}} = this.props;
    const currentSession = sessionsByID[currentSessionID];

    // if (currentSession) {
    //   Actions.libraryProfileMain({userToView: currentSession.ownerID});
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
      player: {paused, currentTrackID, progress},
      sessions: {currentSessionID, sessionsByID},
      users: {currentUserID},
    } = this.props;
    const currentSession = sessionsByID[currentSessionID];

    if (currentSession) {
      togglePause(
        currentUserID,
        currentSession.ownerID,
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
      albums: {albumsByID},
      navigation: {state: {routes}},
      player: {currentTrackID, durationMS, paused, progress},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {usersByID},
    } = this.props;

    return (
      <Animated.View style={[styles.container, {shadowOpacity}]}>
        {(currentTrackID && currentSessionID) &&
          <View style={styles.wrap}>
            <View style={styles.playerBackgroundWrap}>
              <Image
                style={styles.playerBackgroundImage}
                resizeMode='cover'
                blurRadius={90}
                source={{uri: albumsByID[tracksByID[currentTrackID].albumID].large}}
              />
            </View>
            <MiniPlayer
              openPlayer={Actions.liveSession}
              navToProfile={this.navToProfile}
              togglePause={this.handleTogglePause}
              progress={progress}
              durationMS={durationMS}
              profileImage={usersByID[sessionsByID[currentSessionID].ownerID].profileImage}
              name={tracksByID[currentTrackID].name}
              artists={tracksByID[currentTrackID].artists.map(a => a.name).join(', ')}
              displayName={usersByID[sessionsByID[currentSessionID].ownerID].displayName}
              paused={paused}
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
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  nextTrack: PropTypes.func.isRequired,
  pausePlayer: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  sessions: PropTypes.object.isRequired,
  setProgress: PropTypes.func.isRequired,
  startPlayer: PropTypes.func.isRequired,
  stopPlayer: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  title: PropTypes.string,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, player, queue, sessions, tracks, users}) {
  return {
    albums,
    artists,
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
    setProgress,
    startPlayer,
    stopPlayer,
    togglePause,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTabBar);