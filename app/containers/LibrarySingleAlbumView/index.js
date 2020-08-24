'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, VirtualizedList, Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import {onScroll} from 'react-native-redash';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import styles from './styles';

// Components
import ImageCover from '../../components/ImageCover';
import AddToQueueDialog from '../../components/AddToQueueDialog';
import PlayButton from '../../components/PlayButton';
import TrackCard from '../../components/TrackCard';
import TrackModal from '../../components/TrackModal';
import LoadingTrack from '../../components/LoadingTrack';
import AlbumModal from '../../components/AlbumModal';

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

// Tracks Action Creators
import {changeFavoriteTrack} from '../../actions/tracks/ChangeFavoriteTrack';

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);
const {Value, interpolate, Extrapolate} = Animated;
const {height} = Dimensions.get('window');
export const HEADER_MAX_HEIGHT = height * 0.6;
export const HEADER_MIN_HEIGHT = 65;
export const HEADER_DELTA = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class LibrarySingleAlbumView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAlbumMenuOpen: false,
      isTrackMenuOpen: false,
      selectedTrack: '',
      y: new Value(0),
    };

    this.navToDetails = this.navToDetails.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeFavoriteTrack = this.handleChangeFavoriteTrack.bind(this);
  }

  componentDidMount() {
    this.closeModal();
  }

  navToDetails = albumToView => () => Actions.libAlbumDetails({albumToView})

  openModal = (selectedTrack, type) => () => {
    this.setState({
      selectedTrack,
      isTrackMenuOpen: type === 'track',
      isAlbumMenuOpen: type === 'album',
    });
  }

  closeModal = () => this.setState({isTrackMenuOpen: false, isAlbumMenuOpen: false});

  renderTrack = albumToView => ({item, index}) => {
    const {
      entities: {tracks, users},
      users: {currentUserID},
    } = this.props;

    if (item.includes('empty')) {
      return (
        <View style={{backgroundColor: '#1b1b1e', height: height * 0.11}}></View>
      );
    }

    const {displayName} = users.byID[currentUserID];
    const {artists, name, album, trackNumber} = tracks.byID[item];

    return (
      <View style={{backgroundColor: '#1b1b1e'}}>
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
      </View>
    );
  }

  handleAddTrack() {
    const {selectedTrack} = this.state;
    const {
      queueTrack,
      entities: {sessions, tracks, users},
      player: {currentQueueID, currentTrackID},
      queue: {userQueue, totalUserQueue: totalQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (sessions.allIDs.includes(currentSessionID)) {
      const {listeners, ownerID} = sessions.byID[currentSessionID];
      const isListenerOwner = listeners.includes(currentUserID) || ownerID === currentUserID;
      const songInQueue = userQueue.map(t => t.trackID).includes(selectedTrack);
      const {displayName, profileImage} = users.byID[currentUserID];

      if (!songInQueue) {
        const track = tracks.byID[selectedTrack];
        const prevQueueID = userQueue.length ? userQueue[userQueue.length - 1].id : currentQueueID;
        const prevTrackID = userQueue.length ? userQueue[userQueue.length - 1].trackID : currentTrackID;
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
          {...trackToPlay, id: null, trackID: trackToPlay.id},
          {
            id: session.id,
            totalPlayed: session.totalPlayed,
            current: {
              prevQueueID,
              nextQueueID,
              track,
              id: session.currentQueueID,
              totalLikes: queueTrack.totalLikes,
              userID: queueTrack.userID,
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

      Actions.liveSession();

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
      entities: {albums, queueTracks, sessions, tracks, users},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (
      !item
      || (type === 'track' && !tracks.allIDs.includes(item))
      || (type === 'album' && !albums.allIDs.includes(item))
    ) return <View></View>;

    const {favoriteTrackID} = users.byID[currentUserID];
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
            isFavorite={favoriteTrackID === entity.id}
            setFavoriteTrack={this.handleChangeFavoriteTrack(entity.id)}
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

  handleChangeFavoriteTrack = trackID => () => {
    const {changeFavoriteTrack, users: {currentUserID}} = this.props;
    this.closeModal();
    changeFavoriteTrack(currentUserID, trackID);
  }

  renderHeader = ({userTracks, y}) => () => {
    const buttonOpacity = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT * 0.3, 0, HEADER_MAX_HEIGHT * 0.2],
      outputRange: [0, 1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const optionOpacity = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT * 0.3, 0, HEADER_MAX_HEIGHT * 0.5],
      outputRange: [0, 1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <View style={{height: HEADER_MAX_HEIGHT, marginTop: -HEADER_MIN_HEIGHT}}>
        <Animated.View style={[styles.gradient, {height: HEADER_MAX_HEIGHT}]}>
          <LinearGradient
            style={{...StyleSheet.absoluteFill, zIndex: -1}}
            locations={[0, 0.4, 0.7, 0.90, 1]}
            colors={[
              'rgba(27,27,30,0)',
              'rgba(27,27,30,0.3)',
              'rgba(27,27,30,0.5)',
              'rgba(27,27,30,0.9)',
              'rgba(27,27,30,1.0)',
            ]}
          />
          <Animated.View style={[styles.playButtonWrap, {opacity: buttonOpacity}]}>
            <PlayButton play={this.handlePlay(userTracks[0], 0)} />
          </Animated.View>
          {/* <Animated.View style={[styles.headerBottomOptions, {opacity: optionOpacity}]}>
            <TouchableOpacity style={styles.shareButton} disabled={true}>
              <Ionicons name='md-share-alt' style={styles.shareIcon} />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
            <SimpleLineIcons
              name='options'
              style={styles.options}
              onPress={this.openModal('', 'album')}
            />
          </Animated.View> */}
        </Animated.View>
      </View>
    );
  }

  render() {
    const {isAlbumMenuOpen, isTrackMenuOpen, selectedTrack, y} = this.state;
    const shadowOpacity = interpolate(y, {
      inputRange: [HEADER_DELTA, HEADER_DELTA + 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });
    const imageOpacity = interpolate(y, {
      inputRange: [0, HEADER_DELTA * 0.9],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });
    const filterOpacity = interpolate(y, {
      inputRange: [0, HEADER_DELTA * 0.95],
      outputRange: [0.25, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

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
    
    const newTracks = userTracks.length === 1
      ? [...userTracks, 'empty', 'empty-1']
      : userTracks.length === 2
      ? [...userTracks, 'empty']
      : [...userTracks];

    return (
      <View style={styles.container}>
        <ImageCover {...{y, image: large, height: HEADER_MAX_HEIGHT}} />
        <AnimatedVirtualizedList
          data={newTracks}
          renderItem={this.renderTrack(albumToView)}
          keyExtractor={item => item}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
          removeClippedSubviews={false}
          scrollEventThrottle={1}
          ListHeaderComponent={this.renderHeader({userTracks, y})}
          bounces={true}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll({y})}
        />
        <Animated.View style={[styles.header, {shadowOpacity}]}>
          <View style={styles.background}>
            <View style={styles.wrap}>
              {typeof large === 'string' &&
                <Animated.Image
                  style={[styles.image, {opacity: imageOpacity}]}
                  blurRadius={60}
                  source={{uri: large}}
                />
              }
              <Animated.View style={[styles.gradient, {opacity: filterOpacity}]}>
                <LinearGradient
                  style={StyleSheet.absoluteFill}
                  locations={[0, 1]}
                  colors={[
                    'rgba(27,27,30,0)',
                    'rgba(27,27,30,1)',
                  ]}
                />
              </Animated.View>
            </View>
          </View>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            <View style={styles.rightIcon}></View>
            {/* <Ionicons
              name='md-information-circle'
              style={styles.rightIcon}
              onPress={this.navToDetails(albumToView)}
            /> */}
          </View>
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
  changeFavoriteTrack: PropTypes.func.isRequired,
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
    changeFavoriteTrack,
    createSession,
    leaveSession,
    playTrack,
    queueTrack
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibrarySingleAlbumView);