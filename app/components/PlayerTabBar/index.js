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
import {previousTrack} from '../../actions/player/PreviousTrack';
import {pausePlayer} from '../../actions/player/PausePlayer';
import {startPlayer} from '../../actions/player/StartPlayer';
import {stopPlayer} from '../../actions/player/StopPlayer';
import {togglePause} from '../../actions/player/TogglePause';
import {updatePlayer} from '../../actions/player/UpdatePlayer';
import { leaveSession } from '../../actions/sessions/LeaveSession';
import MusicControl from 'react-native-music-control';

class PlayerTabBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coverOpacity: new Animated.Value(1),
      shadowOpacity: new Animated.Value(0),
      coverIndex: new Animated.Value(2),
      trackDelivered: false,
      isPaused:false,
      isPlayed:false,
    };

    this.setProgress = this.setProgress.bind(this);
    this.handleDoneTrack = this.handleDoneTrack.bind(this);
    this.hideCover = this.hideCover.bind(this);
    this.createButton = this.createButton.bind(this);
    this.nav = this.nav.bind(this);
    this.handleTogglePause = this.handleTogglePause.bind(this);
    this.skipNext = this.skipNext.bind(this);
    this.skipPrev = this.skipPrev.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleConnect = this.handleConnect.bind(this);

    this.progressInterval;
    this.startedBackgroundTimer = false;
    this.intervalActive = false;
    this.tabBarBGColor = '#28282b'
  }

  componentDidMount() {
    MusicControl.enableBackgroundMode(true);
    MusicControl.handleAudioInterruptions(true);
    
    const {
      pausePlayer,
      startPlayer,
      entities: {sessions},
      player,
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    
    Spotify.on('play', () => {
      this.setState({trackDelivered:false,isPlayed:true,isPaused:false,});

      MusicControl.enableControl('play', false)
      MusicControl.enableControl('pause', true)

      if (!this.startedBackgroundTimer) {
        // BackgroundTimer.start();
        this.startedBackgroundTimer = true;
      }

      if (typeof this.progressInterval !== 'number') {
        this.progressInterval = setInterval(this.setProgress, 985);
      }

      const {
        updatePlayer,
        sessions: {currentSessionID},
        users: {currentUserID},
      } = this.props;

      updatePlayer(
        { paused: false, buffering: false },
        // { id: currentSessionID, },
        // currentUserID,
        // true
      );
    });

    Spotify.on('pause', () => {
      clearInterval(this.progressInterval);
      MusicControl.enableControl('play', true)
      MusicControl.enableControl('pause', false)
      this.progressInterval = null;
      this.setState({isPaused:true,isPlayed:false,});
    });

    Spotify.on('trackDelivered', this.handleDoneTrack);
    Spotify.on('temporaryPlayerError', () => alert("temporary network error"))
    // Spotify.on('audioFlush', this.handleDisconnect)
    Spotify.on('disconnect', this.handleDisconnect)
    Spotify.on('reconnect', this.handleConnect)
    this.hideCover();
  }

  componentDidUpdate(prevProps) {
    const {
      pausePlayer,
      startPlayer,
      updatePlayer,
      entities: {sessions,tracks},
      player: {
        paused,
        livePause,
        seeking,
        progress,
        durationMS,
        currentQueueID,
        nextQueueID,
        skippingPrev,
        skippingNext,
        skip,
        currentTrackID,
        error: playerError,
      },
      queue: {context, userQueue},
      sessions: {currentSessionID},
      tracks: {fetching, error: tracksError},
      users: {currentUserID},
    } = this.props;
    const {
      entities: {sessions: oldSessions,tracks:oldTracks},
      sessions: {currentSessionID: oldSessionID},
      tracks: {fetching: oldFetching},
      queue: {context: oldContext, userQueue: oldQueue},
      player: {
        paused: oldPaused,
        seeking: oldSeeking,
        progress: oldProgress,
        durationMS: oldDuration,
        currentQueueID: oldCurrentID,
        skippingPrev: oldSkippingPrev,
        skippingNext: oldSkippingNext,
        skip: oldSkip,
        currentTrackID: oldCurrentTrackID,
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

    if (userQueue.length === 0 && oldQueue.length > 0) {
      updatePlayer({nextTrackID: null, nextQueueID: null});
    }

    if (userQueue.length === 1 && userQueue[0].id !== nextQueueID) {
      updatePlayer({nextTrackID: userQueue[0].trackID, nextQueueID: userQueue[0].id});
    }

    const {
      player: {prevTrackID:oldPrevTrackID, nextTrackID:oldNextTrackID,},
    } = this.props;

    //Native music control settings
    if (currentSession && currentUserID !== currentSession.ownerID) {
      if (!oldNextTrackID && !oldPrevTrackID) {
        MusicControl.enableControl('nextTrack', false)
        MusicControl.enableControl('previousTrack', false)
      } else if (oldNextTrackID && oldPrevTrackID) {
        MusicControl.enableControl('nextTrack', true)
        MusicControl.enableControl('previousTrack', true)
      } else if (oldNextTrackID) {
        MusicControl.enableControl('nextTrack', true)
        MusicControl.enableControl('previousTrack', false)
      } else if (oldPrevTrackID) {
        MusicControl.enableControl('nextTrack', false)
        MusicControl.enableControl('previousTrack', true)
      }
    } else {
      MusicControl.enableControl('nextTrack', false)
      MusicControl.enableControl('previousTrack', false)
      MusicControl.enableControl('pause', false)
      MusicControl.enableControl('play', false)
    }

    if (
      currentSession
      && oldSession
      && currentSessionID === oldSessionID
      && typeof currentQueueID === 'string'
      && typeof oldCurrentID === 'string'
      && currentQueueID !== oldCurrentID
    ) {
      updatePlayer({progress: 0});
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
        && currentSession
        && (
          oldSession.progress !== currentSession.progress
          || oldSession.currentTrackID !== currentSession.currentTrackID
        )
      ) {
        updatePlayer({progress: currentSession.progress});

        if (!currentSession.paused) {
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

    if (skip && skip !== oldSkip) {
      Spotify.on('play', () => {
        if (!this.startedBackgroundTimer) {
          // BackgroundTimer.start();
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
    }

    MusicControl.on('play', () => {
      this.handleTogglePause();
    })

    // on iOS this event will also be triggered by audio router change events
    // happening when headphones are unplugged or a bluetooth audio peripheral disconnects from the device
    MusicControl.on('pause', () => {
      this.handleTogglePause();
    })

    MusicControl.on('nextTrack', ()=> {
      this.skipNext();
    })

    MusicControl.on('previousTrack', ()=> {
      this.skipPrev();
    })

    //new track
    if ((currentTrackID && currentTrackID !== oldCurrentTrackID) && currentTrackID) {
      const { album, durationMS, name, artists, id, } = tracks.byID[currentTrackID];
      MusicControl.setNowPlaying({
        title: name,
        artwork: album.medium, // URL or RN's image require()
        artist: artists.map(a => a.name).join(', '),
        album: album.name,
        duration: durationMS / 1000, // (Seconds)
      })

      MusicControl.enableControl('play', false);
      MusicControl.enableControl('pause', true);
    }

    const {
      isPlayed,
      isPaused,
    } = this.state;

    if (isPlayed && currentTrackID) {
      const { album, durationMS, name, artists, id, } = tracks.byID[currentTrackID];

      MusicControl.updatePlayback({
        // title: name,
        // artwork: album.medium || '', // URL or RN's image require()
        // artist: artists.map(a => a.name).join(', '),
        // album: album.name,
        state: MusicControl.STATE_PLAYING,
        elapsedTime: oldProgress / 1000,
      })
    }

    if (isPaused) {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: oldProgress / 1000,
      })
    }
  }

  componentWillUnmount() {
    Spotify.removeAllListeners();
    clearInterval(this.progressInterval);
    this.progressInterval = null;
    this.startedBackgroundTimer = false;
    // BackgroundTimer.stop();
  }

  setProgress() {
    const {
      updatePlayer,
      entities:{users,sessions},
      player: {progress, seeking, durationMS},
      sessions:{currentSessionID},
      users: {currentUserID},
    } = this.props;

    const session = sessions.byID[currentSessionID];
    if (typeof progress === 'number' && !seeking) {
      updatePlayer(
        { progress: progress + 1000 },
        {
          id: currentSessionID,
          ownerID: session.ownerID,
        },
        currentUserID,
        false,
      );
      // MusicControl.updatePlayback({
      //   elapsedTime: progress / 1000,
      // })
    }
  }

  skipNext() {
    const {
      nextTrack,
      entities: {sessions, users},
      player: {nextQueueID, currentQueueID: current},
      queue: {totalUserQueue: totalQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {displayName, profileImage} = users.byID[currentUserID];
    const {totalPlayed, totalListeners: totalUsers} = sessions.byID[currentSessionID];

    nextTrack(
      {displayName, profileImage, id: currentUserID},
      {totalQueue, totalPlayed, totalUsers, current, id: currentSessionID},
      nextQueueID,
    );
  }

  skipPrev() {
    const {
      previousTrack,
      entities: {queueTracks, sessions, tracks, users},
      player: {prevQueueID, prevTrackID, currentTrackID, currentQueueID, nextQueueID, nextTrackID},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    const {displayName, profileImage} = users.byID[currentUserID];
    const {totalPlayed} = sessions.byID[currentSessionID];
    const {userID, totalLikes} = queueTracks.byID[currentQueueID];
    const track = tracks.byID[currentTrackID];
    const user = {displayName, profileImage, id: currentUserID};
    const session = {
      totalPlayed,
      id: currentSessionID,
      current: {
        userID,
        totalLikes,
        prevQueueID,
        prevTrackID,
        nextQueueID,
        nextTrackID,
        track,
        id: currentQueueID,
      },
    };

    previousTrack(user, session);
  }

  handleDisconnect() {
    // alert("network is gone!!")
    this.handleTogglePause();
    const {updatePlayer} = this.props;
    updatePlayer({ buffering: true });
  }

  handleConnect() {
    // alert("network is back!!")
    this.handleTogglePause();
    const {updatePlayer} = this.props;
    updatePlayer({ buffering: false });
  }

  handleDoneTrack() {
    const { trackDelivered, } = this.state;
    if (!trackDelivered) {
      this.setState({trackDelivered:true,});
      const {
        nextTrack,
        stopPlayer,
        leaveSession,
        entities: {sessions, users, tracks},
        player: {nextQueueID, seeking, currentQueueID: current},
        queue: {userQueue, contextQueue, totalQueue,unsubscribe: queueUnsubscribe},
        sessions: {currentSessionID, infoUnsubscribe},
        users: {currentUserID},
      } = this.props;
      const {displayName, profileImage} = users.byID[currentUserID];
      const session = sessions.byID[currentSessionID];
      const track = session ? tracks.byID[session.currentTrackID] : null;
      
      if (currentSessionID && sessions.allIDs.includes(currentSessionID)) {
        const {ownerID, totalPlayed, totalListeners: totalUsers} = sessions.byID[currentSessionID];
  
        clearInterval(this.progressInterval);
        // BackgroundTimer.stop();
  
        // add seeking edge case when song close to end
  
        if (ownerID === currentUserID) {
          if (typeof nextQueueID !== 'string' && !seeking) {
            Actions.pop();
            leaveSession( 
              currentUserID,
              {
                infoUnsubscribe,
                queueUnsubscribe,
                track,
                id: currentSessionID,
                total: session.totalListeners,
                chatUnsubscribe: () => console.log('chat'),
              },
              {
                id: session.ownerID,
                name: users.byID[session.ownerID].displayName,
                image: users.byID[session.ownerID].profileImage,
              },
            );
          }
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

  createButton({routeName}) {
    const {navigation: {state: {index}}} = this.props;

    if (routeName === 'search' || routeName === 'social') return null;

    return (
      <TouchableOpacity style={styles.tabButton} onPress={this.nav(routeName)} key={routeName}>
        <TabIcon routeName={routeName} routeIndex={index} />
      </TouchableOpacity>
    );
  }

  nav = routeName => () => {
    const {navigation: {navigate}} = this.props;
    navigate(routeName)
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

    // console.log("----------live sessions--------------")
    // console.log(session)
    // console.log(users)
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
          {!session.prevOwner || (session.prevOwner && session.prevOwner !== currentUserID) ? <MiniPlayer
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
          /> : null}
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
  previousTrack: PropTypes.func.isRequired,
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
  leaveSession: PropTypes.func.isRequired,
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
    previousTrack,
    pausePlayer,
    leaveSession,
    startPlayer,
    stopPlayer,
    togglePause,
    updatePlayer,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTabBar);