'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Spotify from 'rn-spotify-sdk';
import BackgroundTimer from 'react-native-background-timer';
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

    this.setProgress = this.setProgress.bind(this);
    this.handleDoneTrack = this.handleDoneTrack.bind(this);
    this.hideCover = this.hideCover.bind(this);
    this.navToProfile = this.navToProfile.bind(this);
    this.createButton = this.createButton.bind(this);
    this.nav = this.nav.bind(this);
    this.handleTogglePause = this.handleTogglePause.bind(this);

    this.progressInterval;
    this.intervalActive = false;
    this.coverOpacity = new Animated.Value(1);
    this.coverIndex = new Animated.Value(2);
    this.shadowOpacity = new Animated.Value(0);
    this.tabBarBGColor = '#28282b'
  }

  componentDidMount() {
    // Spotify.on('play', () => {
    //   this.progressInterval = BackgroundTimer.setInterval(this.setProgress, 850);
    // });

    // Spotify.on('pause', BackgroundTimer.clearInterval(this.progressInterval));
    // Spotify.on('trackDelivered', this.handleDoneTrack);
    this.hideCover();
  }

  componentDidUpdate(prevProps) {
    const {
      pausePlayer,
      startPlayer,
      player: {paused, seeking, progress},
      queue: {context},
      sessions: {currentSessionID, sessionsByID},
      tracks: {fetchingMostPlayed, error: tracksError},
      users: {currentUserID},
    } = this.props;
    const {
      player: {paused: oldPaused, seeking: oldSeeking, progress: oldProgress},
      sessions: {sessionsByID: oldSessionsByID, currentSessionID: oldSessionID},
      tracks: {fetchingMostPlayed: oldFetchingMostPlayed},
    } = prevProps;
    const currentSession = sessionsByID[currentSessionID];
    const oldSession = oldSessionsByID[currentSessionID];

    // if (!fetchingMostPlayed && oldFetchingMostPlayed && !tracksError) {
    //   this.hideCover();
    // };

    if (currentSession && this.tabBarBGColor !== 'rgba(27,27,30,0.7)') {
      this.tabBarBGColor = 'rgba(27,27,30,0.7)';
    }

    if (!currentSessionID && this.tabBarBGColor !== '#28282b') {
      this.tabBarBGColor = '#28282b';
    }

    if (oldSessionID !== currentSessionID) {
      // BackgroundTimer.clearInterval(this.progressInterval);
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
  }

  setProgress() {
    const {
      setProgress,
      player: {progress, currentTrackID, seeking},
      sessions: {currentSessionID},
      tracks: {tracksByID},
    } = this.props;
    const {durationMS} = tracksByID[currentTrackID];

    if (progress && durationMS >= progress + 1000 && !seeking) {
      setProgress(currentSessionID, progress + 1000);
    }
  }

  handleDoneTrack() {
    const {
      nextTrack,
      stopSession,
      sessions: {currentSessionID, sessionsByID},
      users: {currentUserID},
    } = this.props;
    const {ownerID, nextToPlay, moreToPlay, previouslyPlayed} = sessionsByID[currentSessionID];

    // BackgroundTimer.clearInterval(this.progressInterval);

    // add seeking edge case when song close to end

    if (ownerID === currentUserID) {
      if (nextToPlay.length !== 0 || moreToPlay.length !== 0) {
        nextTrack(
          currentUserID,
          {
            id: currentSessionID,
            moreToPlay,
            totalNext: nextToPlay.length + 1,
            totalPlayed: previouslyPlayed.length,
          },
        );
      } else {
        stopPlayer(currentSessionID);
      }
    }
  }

  hideCover() {
    if (this.coverOpacity !== 0) {
      Animated.sequence([
        Animated.timing(this.coverOpacity, {
          toValue: 0,
          duration: 300,
          delay: 300,
          easing: Easing.lienar,
        }),
        Animated.timing(this.shadowOpacity, {
          toValue: 0.25,
          duration: 300,
          delay: 300,
          easing: Easing.linear,
        }),
        Animated.timing(this.coverIndex, {
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
    Actions.libraryProfileMain({userToView: currentSession.ownerID});
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
      player: {paused},
      sessions: {currentSessionID, sessionsByID},
      users: {currentUserID},
    } = this.props;
    const currentSession = sessionsByID[currentSessionID];

    togglePause(currentUserID, currentSession.ownerID, currentSessionID, paused);
  }

  render() {
    const animatedCover = {opacity: this.coverOpacity, zIndex: this.coverIndex};
    const animatedShadowOpacity = {shadowOpacity: this.shadowOpacity};
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
      <Animated.View style={[styles.container, animatedShadowOpacity]}>
        {currentTrackID && currentSessionID &&
          <View>
            <View style={styles.playerBackgroundWrap}>
              <Image
                style={styles.playerBackgroundImage}
                resizeMode='cover'
                blurRadius={90}
                source={{uri: albumsByID[tracksByID[currentTrackID].albumID].image}}
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