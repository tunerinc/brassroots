'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, Animated, VirtualizedList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Interactable from 'react-native-interactable';
import Modal from 'react-native-modal';
import AddToQueueDialog from '../../components/AddToQueueDialog';
import PlayButton from '../../components/PlayButton';
import TrackCard from '../../components/TrackCard';
import TrackModal from '../../components/TrackModal';
import LoadingTrack from '../../components/LoadingTrack';
import ArtistModal from '../../components/ArtistModal';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Player Action Creators
import {playTrack} from '../../actions/player/PlayTrack';

// Queue Action Creators
import {queueTrack} from '../../actions/queue/QueueTrack';

// Sessions Action Creators
import {createSession} from '../../actions/sessions/CreateSession';
import {leaveSession} from '../../actions/sessions/LeaveSession';

const HEADER_MAX_HEIGHT = 261;
const HEADER_MIN_HEIGHT = 65;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class LibrarySingleArtistView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      scrollEnabled: false,
      isOpen: false,
      isArtistMenuOpen: false,
      isTrackMenuOpen: false,
      selectedTrack: '',
    };

    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPanelDrag = this.onPanelDrag.bind(this);

    this._deltaY = new Animated.Value(0);
  };

  componentDidMount() {
    this.closeModal();
  }

  navToDetails = (artistToView) => () => {
    Actions.libraryArtistDetails({artistToView});
  }

  renderTrack = (artistToView) => ({item, index}) => {
    const {
      albums: {albumsByID},
      artists: {artistsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {displayName} = usersByID[currentUserID];
    const {name, albumID, artists} = tracksByID[item];
    const {medium, name: albumName} = albumsByID[albumID];
    const {name: artistName} = artistsByID[artistToView];

    return (
      <TrackCard
        key={item}
        albumName={albumName}
        type='cover'
        context={{displayName, name: artistName, id: artistToView, type: 'user-artist'}}
        name={name}
        onPress={this.handlePlay(item, index)}
        openModal={this.openModal(item, 'track')}
        showOptions={true}
        showSquareImage={true}
        image={medium}
        artists={artists.map(a => a.name).join(', ')}
      />
    );
  }

  handleAddTrack() {
    const {selectedTrack} = this.state;
    const {
      queueTrack,
      albums: {albumsByID},
      player: {currentQueueID},
      queue: {userQueue, queueByID, totalQueue},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const currentSession = sessionsByID[currentSessionID];

    if (currentSession) {
      const {listeners, ownerID} = currentSession;
      const isListenerOwner = listeners.includes(currentUserID) || ownerID === currentUserID;
      const songInQueue = userQueue.map(id => queueByID[id].trackID).includes(selectedTrack);
      const {displayName, profileImage} = usersByID[currentUserID];

      if (isListenerOwner && !songInQueue) {
        const {name, durationMS, trackNumber, albumID, artists} = tracksByID[selectedTrack];
        const {small, medium, large, name: albumName, artists: albumArtists} = albumsByID[albumID];
        const prevQueueID = userQueue.length ? userQueue[userQueue.length - 1] : currentQueueID;
        const {trackID: prevTrackID} = queueByID[prevQueueID];
        const session = {prevQueueID, prevTrackID, totalQueue, id: currentSessionID};
        const user = {displayName, profileImage, id: currentUserID};
        const track = {
          name,
          durationMS,
          trackNumber,
          artists,
          id: selectedTrack,
          album: {
            small,
            medium,
            large,
            id: albumID,
            name: albumName,
            artists: albumArtists,
          },
        };

        this.closeModal();
        queueTrack(session, track, user);
      }
    }
  }

  handlePlay = (trackID, trackIndex) => () => {
    const {
      artistToView,
      createSession,
      playTrack,
      albums: {albumsByID},
      artists: {artistsByID},
      player: {prevQueueID, nextQueueID},
      queue: {queueByID},
      sessions: {currentSessionID, sessionsByID},
      settings: {preference: {session: mode}},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const currentSession = sessionsByID[currentSessionID];
    const {displayName, profileImage, totalFollowers} = usersByID[currentUserID];
    const {name, durationMS, trackNumber, albumID, artists} = tracksByID[trackID];
    const {small, medium, large, name: albumName, artists: albumArtists} = albumsByID[albumID];
    const {userTracks, name: artistName} = artistsByID[artistToView];
    const user = {displayName, profileImage, id: currentUserID};
    const track = {
      name,
      durationMS,
      trackNumber,
      artists,
      id: trackID,
      album: {
        small,
        medium,
        large,
        id: albumID,
        name: albumName,
        artists: albumArtists,
      },
    };

    if (currentSession) {
      if (currentSession.ownerID === currentUserID) {
        const currentTrack = tracksByID[currentSession.currentTrackID];
        const currentAlbum = albumsByID[currentTrack.albumID];
        const currentQueue = queueByID[currentSession.currentQueueID];

        playTrack(
          user,
          {...track, id: null, trackID: track.id},
          {
            id: currentSession.id,
            totalPlayed: currentSession.totalPlayed,
            current: {
              prevQueueID,
              nextQueueID,
              id: currentSession.currentQueueID,
              totalLikes: currentQueue.totalLikes,
              userID: currentQueue.userID,
              track: {
                id: currentTrack.id,
                name: currentTrack.name,
                trackNumber: currentTrack.trackNumber,
                artists: currentTrack.artists,
                album: {
                  id: currentAlbum.id,
                  name: currentAlbum.name,
                  small: currentAlbum.small,
                  medium: currentAlbum.medium,
                  large: currentAlbum.large,
                  artists: currentAlbum.artists,
                },
              },
            },
          },
          {
            displayName,
            id: artistToView,
            name: artistName,
            type: 'user-artist',
            total: userTracks.length,
            position: trackIndex,
            tracks: userTracks.slice(trackIndex + 1, trackIndex + 4),
          },
        );
      } else {

      }
    } else {
      setTimeout(Actions.liveSession, 200);

      createSession(
        {...user, totalFollowers},
        track,
        {
          displayName,
          id: artistToView,
          name: artistName,
          type: 'user-artist',
          total: userTracks.length,
          position: trackIndex,
          tracks: userTracks.slice(trackIndex + 1, trackIndex + 4),
        },
        mode,
      );
    }
  }

  renderModalContent(type, item) {
    const {
      albums: {albumsByID},
      artists: {artistsByID},
      queue: {userQueue, queueByID},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
    } = this.props;

    if (
      !item
      || (type === 'track' && !tracksByID.hasOwnProperty(item))
      || (type === 'artist' && !artistsByID.hasOwnProperty(item))
    ) return <View></View>;

    switch (type) {
      case 'track': {
        const {name, albumID, artists} = tracksByID[item];
        const {small, name: albumName} = albumsByID[albumID];
        const sessionExists = currentSessionID && sessionsByID[currentSessionID];
        const songQueued = userQueue.map(id => queueByID[id].trackID).includes(item);
        const isListenerOwner = sessionExists
          && (
            sessionsByID[currentSessionID].listeners.includes(currentUserID)
            || sessionsByID[currentSessionID].ownerID === currentUserID
          );

        return (
          <TrackModal
            trackID={item}
            closeModal={this.closeModal}
            queueTrack={this.handleAddTrack}
            name={name}
            artists={artists.map(a => a.name).join(', ')}
            albumName={albumName}
            albumImage={small}
            trackInQueue={songQueued}
            isListenerOwner={isListenerOwner}
          />
        );
      }
      case 'artist': {
        const {small, name} = artistsByID[item];
        return <ArtistModal artistImage={small} artistName={name} closeModal={this.closeModal} />;
      }
      default:
        return <View></View>;
    }
  }

  openModal = (selectedTrack, type) => () => {
    this.setState({
      selectedTrack,
      isTrackMenuOpen: type === 'track',
      isArtistMenuOpen: type === 'artist',
    });
  }

  closeModal() {
    this.setState({isTrackMenuOpen: false, isArtistMenuOpen: false});
  }

  onPanelDrag({nativeEvent: {y}}) {
    const {isOpen, scrollEnabled} = this.state;

    if (y <= -(HEADER_SCROLL_DISTANCE / 2) && isOpen && !scrollEnabled) {
      this.setState({scrollEnabled: true, isOpen: false});
    }

    if (y >= -(HEADER_SCROLL_DISTANCE / 2) && !isOpen) {
      this.setState({scrollEnabled: false, isOpen: true});
    }
  }

  onScroll({nativeEvent: {contentOffset}}) {
    const {isOpen, scrollEnabled} = this.state;

    if ((isOpen || contentOffset.y <= 0) && scrollEnabled) {
      this.setState({scrollEnabled: false, isOpen: true});
      this.refs['TrackList'].getScrollResponder().scrollTo({x: 0, y: 0});
    }
  }

  render() {
    const headerHeight = this._deltaY.interpolate({
      inputRange: [-HEADER_SCROLL_DISTANCE, -HEADER_SCROLL_DISTANCE, 0, 0],
      outputRange: [HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, HEADER_MAX_HEIGHT],
      extrapolate: 'clamp',
    });
    const headerShadowOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 0.9],
      extrapolate: 'clamp',
    });
    const filterOpacity = this._deltaY.interpolate({
      inputRange: [-HEADER_SCROLL_DISTANCE, -HEADER_SCROLL_DISTANCE, 0, 0],
      outputRange: [1, 1, 0, 0],
      extrapolate: 'clamp',
    });
    const headerOptionsOpacity = this._deltaY.interpolate({
      inputRange: [-HEADER_SCROLL_DISTANCE * 0.1, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const headerOptionsOffset = this._deltaY.interpolate({
      inputRange: [-HEADER_SCROLL_DISTANCE * 0.15, -HEADER_SCROLL_DISTANCE * 0.1],
      outputRange: [600, 0],
      extrapolate: 'clamp',
    });
    const playButtonOpacity = this._deltaY.interpolate({
      inputRange: [-HEADER_SCROLL_DISTANCE * 0.4, -HEADER_SCROLL_DISTANCE * 0.2],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const playButtonOffset = this._deltaY.interpolate({
      inputRange: [-HEADER_SCROLL_DISTANCE * 0.45, -HEADER_SCROLL_DISTANCE * 0.4],
      outputRange: [600, 0],
      extrapolate: 'clamp',
    });
    const {isArtistMenuOpen, isTrackMenuOpen, scrollEnabled, selectedTrack, scrollY: y} = this.state;
    const {
      artistToView,
      albums: {albumsByID},
      artists: {artistsByID},
      queue: {userQueue, queueing, error: queueError},
      sessions: {sessionsByID, currentSessionID},
      tracks: {tracksByID},
      users: {currentUserID},
    } = this.props;
    const {userTracks, name, large} = artistsByID[artistToView];
    const sessionExists = currentSessionID && sessionsByID.hasOwnProperty(currentSessionID);
    const queueHasTracks = sessionExists && userQueue.length > 0;
    const inSession = sessionExists
      && (
        sessionsByID[currentSessionID].listeners.includes(currentUserID)
        || sessionsByID[currentSessionID].ownerID === currentUserID
      );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.View
            style={[
              styles.animatedHeader,
              {height: headerHeight, backgroundColor: large === '' ? '#888' : '#1b1b1e'},
            ]}
          >
          </Animated.View>
        </View>
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -(HEADER_SCROLL_DISTANCE)}]}
          boundaries={{top: -(HEADER_SCROLL_DISTANCE), bottom: 0}}
          animatedValueY={this._deltaY}
          onDrag={this.onPanelDrag}
        >
          {userTracks.length !== 0 &&
            <VirtualizedList
              ref='TrackList'
              data={userTracks}
              renderItem={this.renderTrack(artistToView)}
              keyExtractor={item => item}
              getItem={(data, index) => data[index]}
              getItemCount={data => data.length}
              removeClippedSubviews={false}
              scrollEventThrottle={16}
              bounces={true}
              canCancelContentTouches={scrollEnabled}
              scrollEnabled={scrollEnabled}
              style={styles.list}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y}}}],
                {listener: this.onScroll},
              )}
            />
          }
          {(userTracks.length === 0 || !userTracks.length) &&
            <View style={styles.scrollWrap}>
              <LoadingTrack type='cover' />
            </View>
          }
        </Interactable.View>
        <Animated.View
          style={[
            styles.animatedShadow,
            {
              height: headerHeight,
              shadowOpacity: headerShadowOpacity,
              backgroundColor: large === '' ? '#888' : '#1b1b1e',
            },
          ]}
        >
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            <Ionicons
              name='md-information-circle'
              style={styles.rightIcon}
              onPress={this.navToDetails(artistToView)}
            />
          </View>
          <Animated.View
            style={[
              styles.playButtonWrap,
              {opacity: playButtonOpacity, bottom: playButtonOffset}
            ]}
          >
            <PlayButton play={this.handlePlay(userTracks[0], 0)} />
          </Animated.View>
          <Animated.View
            style={[
              styles.headerBottomOptions,
              {opacity: headerOptionsOpacity, bottom: headerOptionsOffset},
            ]}
          >
            <TouchableOpacity style={styles.shareButton} disabled={true}>
              <Ionicons name='md-share-alt' color='#fefefe' style={styles.shareIcon} />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
            <SimpleLineIcons
              name='options'
              style={styles.options}
              onPress={this.openModal('', 'artist')}
            />
          </Animated.View>
          <View style={styles.headerFilter} />
          <Image
            style={styles.headerBackground}
            source={{uri: large}}
            resizeMode='cover'
          />
          <Animated.Image
            source={{uri: large}}
            blurRadius={80}
            resizeMode='cover'
            style={[styles.headerBackground, styles.blurred, {opacity: filterOpacity}]}
          />
        </Animated.View>
        <Modal
          isVisible={isTrackMenuOpen}
          backdropColor={'#1b1b1e'}
          backdropOpacity={0.7}
          animationIn='slideInUp'
          animationInTiming={230}
          backdropTransitionInTiming={230}
          animationOut='slideOutDown'
          animationOutTiming={230}
          backdropTransitionOutTiming={230}
          hideModalContentWhileAnimating
          useNativeDriver={true}
          style={styles.modal}
          onBackdropPress={this.closeModal}
        >
          {this.renderModalContent('track', selectedTrack)}
        </Modal>
        <Modal
          isVisible={isArtistMenuOpen}
          backdropColor={ '#1b1b1e' }
          backdropOpacity={0.7}
          animationIn='slideInUp'
          animationInTiming={230}
          backdropTransitionInTiming={230}
          animationOut='slideOutDown'
          animationOutTiming={230}
          backdropTransitionOutTiming={230}
          hideModalContentWhileAnimating
          useNativeDriver={true}
          style={styles.modal}
          onBackdropPress={this.closeModal}
        >
          {this.renderModalContent('artist', artistToView)}
        </Modal>
        {(typeof selectedTrack === 'string' && selectedTrack !== '' && tracksByID[selectedTrack]) &&
          <AddToQueueDialog
            queueing={queueing}
            error={queueError}
            inSession={inSession}
            queueHasTracks={queueHasTracks}
            image={albumsByID[tracksByID[selectedTrack].albumID].medium}
          />
        }
      </View>
    );
  }
}

LibrarySingleArtistView.propTypes = {
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  artistToView: PropTypes.string,
  createSession: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  playTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  queueTrack: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps(
  {albums, artists, player, playlists, queue, sessions, settings, tracks, users},
) {
  return {
    albums,
    artists,
    player,
    playlists,
    queue,
    sessions,
    settings,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    leaveSession,
    playTrack,
    queueTrack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibrarySingleArtistView);