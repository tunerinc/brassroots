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
import AlbumModal from '../../components/AlbumModal';
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

class LibrarySingleAlbumView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      scrollEnabled: false,
      isOpen: true,
      isAlbumMenuOpen: false,
      isTrackMenuOpen: false,
      selectedTrack: '',
    };

    this.navToDetails = this.navToDetails.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPanelDrag = this.onPanelDrag.bind(this);

    this._deltaY = new Animated.Value(0);
  }

  componentDidMount() {
    this.closeModal();
  }

  navToDetails = albumToView => () => Actions.libraryAlbumDetails({albumToView});

  openModal = (selectedTrack, type) => () => {
    this.setState({
      selectedTrack,
      isTrackMenuOpen: type === 'track',
      isAlbumMenuOpen: type === 'album',
    });
  }

  closeModal() {
    this.setState({isTrackMenuOpen: false, isAlbumMenuOpen: false});
  }

  renderTrack = albumToView => ({item, index}) => {
    const {
      entities: {tracks, users},
      users: {currentUserID},
    } = this.props;
    const {displayName} = users.byID[currentUserID];
    const {artists, name, album, trackNumber} = tracks.byID[item];

    return (
      <TrackCard
        key={item}
        albumName={album.name}
        type='album'
        context={{displayName, id: albumToView, name: album.name, type: 'user-album'}}
        name={name}
        onPress={this.handlePlay(item, index)}
        openModal={this.openModal(item, 'track')}
        showOptions={true}
        artists={artists.map(a => a.name).join(', ')}
        trackNumber={trackNumber}
      />
    );
  }

  handleAddTrack() {
    const {selectedTrack} = this.state;
    const {
      queueTrack,
      entities: {queueTracks, sessions, tracks, users},
      player: {currentQueueID},
      queue: {userQueue, totalUserQueue: totalQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (sessions.allIDs.includes(currentSessionID)) {
      const {listeners, ownerID} = sessions.byID[currentSessionID];
      const isListenerOwner = listeners.includes(currentUserID) || ownerID === currentUserID;
      const songInQueue = userQueue.map(t => t.trackID).includes(selectedTrack);
      const {displayName, profileImage} = users.byID[currentUserID];

      if (isListenerOwner && !songInQueue) {
        const track = tracks.byID[selectedTrack];
        const prevQueueID = userQueue.length ? userQueue[userQueue.length - 1].id : currentQueueID;
        const prevTrackID = queueTracks.byID[prevQueueID];
        const session = {prevQueueID, prevTrackID, totalQueue, id: currentSessionID};
        const user = {displayName, profileImage, id: currentUserID};

        this.closeModal();
        queueTrack(session, track, user);
      }
    }
  }

  handlePlay = (trackID, trackIndex) => () => {
    const {
      albumToView,
      createSession,
      playTrack,
      leaveSession,
      entities: {albums, queueTracks, sessions, tracks, users},
      player: {prevQueueID, nextQueueID},
      queue: {unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, infoUnsubscribe},
      settings: {preference: {session: mode}},
      users: {currentUserID},
    } = this.props;
    const session = sessions.byID[currentSessionID];
    const track = session ? tracks.byID[session.currentTrackID] : null;
    const queueTrack = session ? queueTracks.byID[session.currentQueueID] : null;
    const {displayName, profileImage, totalFollowers} = users.byID[currentUserID];
    const trackToPlay = tracks.byID[trackID];
    const {userTracks} = albums.byID[trackToPlay.album.id];
    const user = {displayName, profileImage, id: currentUserID};

    if (session && session.ownerID === currentUserID) {
      if (session.currentTrackID === trackID) {
        Actions.liveSession();
      } else {
        playTrack(
          user,
          {...trackToPlay, id: null, trackID: track.id},
          {
            id: session.id,
            totalPlayed: session.totalPlayed,
            current: {
              prevQueueID,
              nextQueueID,
              track,
              id: session.currentQueueID,
              totalLikes: currentQueue.totalLikes,
              userID: currentQueue.userID,
            },
          },
          {
            displayName,
            id: albumToView,
            name: trackToPlay.album.name,
            type: 'user-album',
            total: userTracks.length,
            position: trackIndex,
            tracks: userTracks.slice(trackIndex + 1, trackIndex + 4),
          },
        );
      }
    } else {
      if (session) {
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

      setTimeout(Actions.liveSession, 200);

      createSession(
        {...user, totalFollowers},
        trackToPlay,
        {
          displayName,
          id: albumToView,
          name: trackToPlay.album.name,
          type: 'user-album',
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
      entities: {albums, queueTracks, sessions, tracks},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (
      !item
      || (type === 'track' && !tracks.allIDs.includes(item))
      || (type === 'album' && !albums.allIDs.includes(item))
    ) return <View></View>;

    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const songQueued = userQueue.map(t => t.trackID).includes(item);
    const entity = type === 'track' ? tracks.byID[item] : albums.byID[item];
    const isListenerOwner = sessionExists
      && (
        sessions.byID[currentSessionID].listeners.includes(currentUserID)
        || sessions.byID[currentSessionID].ownerID === currentUserID
      );

    switch (type) {
      case 'track':
        return (
          <TrackModal
            trackID={item}
            closeModal={this.closeModal}
            queueTrack={this.handleAddTrack}
            name={entity.name}
            artists={entity.artists.map(a => a.name).join(', ')}
            albumName={entity.album.name}
            albumImage={entity.album.small}
            trackInQueue={songQueued}
            isListenerOwner={sessionExists ? isListenerOwner : null}
          />
        );
      case 'album':
        return (
          <AlbumModal
            albumImage={entity.small}
            albumName={entity.name}
            artists={entity.artists.map(a => a.name).join(', ')}
            closeModal={this.closeModal}
          />
        );
      default:
        return <View></View>;
    }
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
    const {isAlbumMenuOpen, isTrackMenuOpen, scrollEnabled, selectedTrack, scrollY: y} = this.state;
    const {
      albumToView,
      entities: {albums, sessions, tracks},
      albums: {fetching, refreshing, error: albumError},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {userTracks, name, medium, large} = albums.byID[albumToView];
    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const queueHasTracks = userQueue.length > 0;
    const inSession = sessionExists
      && (
        sessions.byID[currentSessionID].listeners.includes(currentUserID)
        || sessions.byID[currentSessionID].ownerID === currentUserID
      );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.View
            style={[
              styles.animatedHeader,
              {height: headerHeight, backgroundColor: large === '' ? '#888' : '#1b1b1e'},
            ]}
          />
        </View>
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -HEADER_SCROLL_DISTANCE}]}
          boundaries={{top: -HEADER_SCROLL_DISTANCE, bottom: 0}}
          animatedValueY={this._deltaY}
          onDrag={this.onPanelDrag}
        >
          {userTracks.length !== 0 &&
            <VirtualizedList
              ref='TrackList'
              data={userTracks}
              renderItem={this.renderTrack(albumToView)}
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
              <LoadingTrack type='album' />
              <LoadingTrack type='album' />
              <LoadingTrack type='album' />
              <LoadingTrack type='album' />
              <LoadingTrack type='album' />
              <LoadingTrack type='album' />
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
            }
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
              onPress={this.navToDetails(albumToView)}
            />
          </View>
          <Animated.View
            style={[
              styles.playButtonWrap,
              {opacity: playButtonOpacity, bottom: playButtonOffset},
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
              <Ionicons name='md-share-alt' style={styles.shareIcon} />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
            <SimpleLineIcons
              name='options'
              style={styles.options}
              onPress={this.openModal('', 'album')}
            />
          </Animated.View>
          <View style={styles.headerFilter} />
          <Image style={styles.headerBackground} source={{uri: large}} resizeMode='cover' />
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
          isVisible={isAlbumMenuOpen}
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
          {this.renderModalContent('album', albumToView)}
        </Modal>
        {(typeof selectedTrack === 'string' && tracks.allIDs.includes(selectedTrack)) &&
          <AddToQueueDialog
            queueing={queueing}
            error={queueError}
            inSession={inSession}
            queueHasTracks={queueHasTracks}
            image={tracks.byID[selectedTrack].album.medium}
          />
        }
      </View>
    );
  }
}

LibrarySingleAlbumView.propTypes = {
  albums: PropTypes.object.isRequired,
  albumToView: PropTypes.string,
  createSession: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.object,
  playTrack: PropTypes.func,
  queueTrack: PropTypes.func,
  sessions: PropTypes.object,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

function mapStateToProps({albums, entities, player, queue, sessions, settings, tracks, users}) {
  return {
    albums,
    entities,
    player,
    queue,
    sessions,
    settings,
    tracks,
    users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    leaveSession,
    playTrack,
    queueTrack
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibrarySingleAlbumView);