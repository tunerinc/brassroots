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

  navToDetails = (albumToView) => () => {
    Actions.libraryAlbumDetails({albumToView});
  }

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
      albums: {albumsByID},
      tracks: {tracksByID},
      users: {usersByID, currentUserID},
    } = this.props;
    const {displayName} = usersByID[currentUserID];
    const {albumID, artists, name, trackNumber} = tracksByID[item];
    const {name: albumName} = albumsByID[albumToView];

    return (
      <TrackCard
        key={item}
        albumName={albumName}
        type='album'
        context={{displayName, id: albumToView, name: albumName, type: 'user-album'}}
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
      albums: {albumsByID},
      artists: {artistsByID},
      player: {prevQueueID},
      queue: {userQueue, queueByID, contextQueue, totalQueue},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;

    if (currentSessionID && Object.keys(sessionsByID).indexOf(currentSessionID)) {
      const {listeners, ownerID} = sessionsByID[currentSessionID];
      const isListenerOwner = listeners.indexOf(currentUserID) !== -1 || ownerID === currentUserID;
      const songQueued = userQueue.map(id => queueByID[id].trackID).indexOf(selectedTrack) !== -1;
      const {displayName, profileImage} = usersByID[currentUserID];

      if (isListenerOwner && !songQueued && selectedTrack !== '') {
        const {name, durationMS, albumID, artists} = tracksByID[selectedTrack];
        const {name: albumName, small, medium, large, artists: albumArtists} = albumsByID[albumID];
        const trackToQueue = {
          name,
          durationMS,
          id: selectedTrack,
          artists: artists.map(a => a.name).join(', '),
          album: {
            small,
            medium,
            large,
            id: albumID,
            name: albumName,
            artists: albumArtists.map(a => a.name).join(', '),
          },
        };

        this.closeModal();
        queueTrack(
          {
            prevQueueID,
            totalQueue,
            id: currentSessionID,
          },
          trackToQueue,
          {
            displayName,
            profileImage,
            id: currentUserID,
          },
        );
      }
    }
  }

  handlePlay = (trackID, trackIndex) => () => {
    const {
      albumToView,
      createSession,
      albums: {albumsByID},
      sessions: {currentSessionID, sessionsByID},
      settings: {preference: {session: mode}},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const currentSession = sessionsByID[currentSessionID];
    const {displayName, profileImage, totalFollowers} = usersByID[currentUserID];
    const {name, durationMS, trackNumber, albumID, artists} = tracksByID[trackID];
    const {
      small,
      medium,
      large,
      userTracks,
      name: albumName,
      artists: albumArtists,
    } = albumsByID[albumID];

    if (currentSession) {
      if (currentSession.ownerID === currentUserID) {

      } else {

      }
    } else {
      setTimeout(Actions.liveSession, 200);

      createSession(
        {displayName, profileImage, totalFollowers, id: currentUserID},
        {
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
        },
        {
          displayName,
          id: albumToView,
          name: albumName,
          type: 'user-album',
          total: userTracks.length,
          position: trackIndex,
          tracks: userTracks.slice(trackIndex + 1),
        },
        mode,
      );
    }
  }

  renderModalContent(type, item) {
    const {
      albums: {albumsByID},
      queue: {userQueue, queueByID},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID},
    } = this.props;

    if (
      !item
      || (type === 'track' && !tracksByID[item])
      || (type === 'album' && !albumsByID[item])
    ) return <View></View>;

    const sessionExists = currentSessionID && sessionsByID[currentSessionID];
    const songQueued = userQueue.map(id => queueByID[id].trackID).includes(item);
    const isListenerOwner = sessionExists
      && (
        sessionsByID[currentSessionID].listeners.includes(currentUserID)
        || sessionsByID[currentSessionID].ownerID === currentUserID
      );

    switch (type) {
      case 'track':
        return (
          <TrackModal
            trackID={item}
            closeModal={this.closeModal}
            queueTrack={this.handleAddTrack}
            name={tracksByID[item].name}
            artists={tracksByID[item].artists.map(a => a.name).join(', ')}
            albumName={albumsByID[tracksByID[item].albumID].name}
            albumImage={albumsByID[tracksByID[item].albumID].small}
            trackInQueue={songQueued}
            isListenerOwner={sessionExists ? isListenerOwner : null}
          />
        );
      case 'album':
        return (
          <AlbumModal
            albumImage={albumsByID[item].small}
            albumName={albumsByID[item].name}
            artists={albumsByID[item].artists.map(a => a.name).join(', ')}
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
      albums: {albumsByID, fetchingTracks, refreshingTracks, error: albumError},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID},
    } = this.props;
    const {userTracks, name, medium, large} = albumsByID[albumToView];
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
              {height: headerHeight},
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
              <Ionicons name='md-share-alt' color='#fefefe' style={styles.shareIcon} />
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

LibrarySingleAlbumView.propTypes = {
  albums: PropTypes.object.isRequired,
  albumToView: PropTypes.string,
  createSession: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.object,
  playlists: PropTypes.object,
  playTrack: PropTypes.func,
  queueTrack: PropTypes.func,
  sessions: PropTypes.object,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

function mapStateToProps({albums, player, playlists, queue, sessions, settings, tracks, users}) {
  return {
    albums,
    player,
    playlists,
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