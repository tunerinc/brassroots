'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  VirtualizedList,
  Dimensions,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import debounce from "lodash.debounce";
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import {onScroll} from 'react-native-redash';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import styles from './styles';

// Components
import ImageCover from '../../components/ImageCover';
import AddToQueueDialog from '../../components/AddToQueueDialog';
import PlaylistModal from '../../components/PlaylistModal';
import TrackCard from '../../components/TrackCard';
import TrackModal from '../../components/TrackModal';
import LoadingTrack from '../../components/LoadingTrack';
import PlayButton from '../../components/PlayButton';

// Icons
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Player Action Creators
import {playTrack} from '../../actions/player/PlayTrack';

// Playlists Action Creators
import {getPlaylistTracks} from '../../actions/playlists/GetPlaylistTracks';

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

class PlaylistView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaylistMenuOpen: false,
      isTrackMenuOpen: false,
      selectedTrack: '',
      y: new Value(0),
    };

    this.onEndReached = this.onEndReached.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.navToDetails = this.navToDetails.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeFavoriteTrack = this.handleChangeFavoriteTrack.bind(this);

    this._onEndReached = debounce(this.onEndReached, 0);
  }

  componentDidMount() {
    const {getPlaylistTracks, playlistToView, entities: {playlists}} = this.props;

    InteractionManager.runAfterInteractions(() => {
      this.closeModal();

      if (
        playlistToView
        && !playlists.byID[playlistToView].tracks.length
      ) {
        getPlaylistTracks(playlistToView);
      }
    });
  }

  onEndReached() {
    const {
      getPlaylistTracks,
      playlistToView,
      entities: {playlists},
      playlists: {fetching},
    } = this.props;

    if (
      !fetching.includes('tracks')
      && playlistToView
      && playlists.byID[playlistToView].tracks.length
      && playlists.byID[playlistToView].tracks.length !== playlists.byID[playlistToView].total
    ) {
      getPlaylistTracks(playlistToView, false, playlists.byID[playlistToView].tracks.length);
    }
  }

  handleRefresh() {
    const {getPlaylistTracks, playlistToView, playlists: {refreshing}} = this.props;
    if (!refreshing.includes('tracks') && playlistToView) getPlaylistTracks(playlistToView, true);
  }

  renderFooter() {
    const {
      playlistToView,
      entities: {playlists},
      playlists: {fetching, refreshing},
    } = this.props;
    const {tracks, total: totalTracks} = playlists.byID[playlistToView];

    if (
      !fetching.includes('tracks')
      || refreshing.includes('tracks')
      || !tracks.length
      || tracks.length === totalTracks
    ) return <View></View>;

    const total = totalTracks - tracks.length < 100 ? totalTracks - tracks.length : 100;

    return (
      <View style={styles.footer}>
        <FastImage style={styles.loadingGif} source={require('../../images/loading.gif')} />
      </View>
    );
  }

  navToDetails = (playlistToView, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libPlaylistDetails({playlistToView});
        return;
      case 'Profile':
        Actions.proPlaylistDetails({playlistToView});
        return;
      default:
        return;
    }
  }

  renderTrack = playlistToView => ({item, index}) => {
    const {
      entities: {playlists, tracks},
      users: {currentUserID},
    } = this.props;

    if (item.includes('empty')) {
      return (
        <View style={{backgroundColor: '#1b1b1e', height: height * 0.11}}></View>
      );
    }

    const {name, artists, album} = tracks.byID[item];
    const {ownerID, name: playlistName} = playlists.byID[playlistToView];
    const displayName = ownerID === 'spotify' ? 'Spotify' : ownerID;

    return (
      <View style={{backgroundColor: '#1b1b1e'}}>
        <TrackCard
          key={`${item}-${index}`}
          albumName={album.name}
          type='cover'
          context={{displayName, name: playlistName, id: playlistToView, type: 'playlist'}}
          name={name}
          onPress={this.handlePlay(item, index)}
          openModal={this.openModal(item, 'track')}
          showOptions={true}
          showSquareImage={true}
          image={album.medium}
          artists={artists.map(a => a.name).join(', ')}
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
      createSession,
      playlistToView,
      playTrack,
      leaveSession,
      entities: {albums, playlists, queueTracks, sessions, tracks, users},
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
    const {ownerID, name: playlistName, total} = playlists.byID[playlistToView];
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
            total,
            id: playlistToView,
            name: playlistName,
            displayName: ownerID === 'spotify' ? 'spotify' : users.byID[ownerID].displayName,
            type: 'playlist',
            position: trackIndex,
            tracks: [],
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
          total,
          id: playlistToView,
          name: playlistName,
          displayName: ownerID === 'spotify' ? 'spotify' : users.byID[ownerID].displayName,
          type: 'playlist',
          position: trackIndex,
          tracks: [],
        },
        mode,
      );
    }
  }

  renderModalContent(type, item) {
    const {
      entities: {playlists, sessions, tracks, users},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (
      !item
      || (type === 'track' && !tracks.allIDs.includes(item))
      || (type === 'playlist' && !playlists.allIDs.includes(item))
    ) return <View></View>;

    const entity = type === 'track' ? tracks.byID[item] : playlists.byID[item];
    const {favoriteTrackID} = users.byID[currentUserID];

    switch (type) {
      case 'track': {
        const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
        const songQueued = userQueue.map(o => o.trackID).includes(item);
        const isListenerOwner = sessionExists
          && (
            sessions.byID[currentSessionID].listeners.includes(currentUserID)
            || sessions.byID[currentSessionID].ownerID === currentUserID
          );

        return (
          <TrackModal
            trackID={item}
            closeModal={this.closeModal}
            queueTrack={this.handleAddTrack}
            name={entity.name}
            artists={entity.artists.map(a => a.name).join(', ')}
            albumName={entity.album.name}
            albumImage={entity.album.medium}
            trackInQueue={songQueued}
            isListenerOwner={isListenerOwner}
            isFavorite={favoriteTrackID === entity.id}
            setFavoriteTrack={this.handleChangeFavoriteTrack(entity.id)}
          />
        );
      }
      case 'playlist': {
        const {displayName} = users.byID[entity.ownerID];
        const {displayName: currentName} = users.byID[currentUserID];
        const isOwnerMember = entity.ownerID === currentUserID || entity.members.includes(currentUserID);
        const ownerName = displayName && displayName !== currentName
          ? displayName
          : entity.ownerID === 'spotify'
          ? 'Spotify'
          : null;

        return (
          <PlaylistModal
            closeModal={this.closeModal}
            name={entity.name}
            image={entity.medium}
            displayName={ownerName}
            isOwnerMember={isOwnerMember}
          />
        );
      }
      default:
        return <View></View>;
    }
  }

  openModal = (selectedTrack, type) => () => {
    this.setState({
      selectedTrack,
      isTrackMenuOpen: type === 'track',
      isPlaylistMenuOpen: type === 'playlist',
    });
  }

  closeModal = () => this.setState({isTrackMenuOpen: false, isPlaylistMenuOpen: false});

  handleChangeFavoriteTrack = trackID => () => {
    const {changeFavoriteTrack, users: {currentUserID}} = this.props;
    changeFavoriteTrack(currentUserID, trackID);
    this.closeModal();
  }

  renderHeader = ({mode, members, currentUserID, tracks, y}) => () => {
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
            <PlayButton play={this.handlePlay(tracks[0], 0)} />
          </Animated.View>
          {/* <Animated.View style={[styles.headerBottomOptions, {opacity: optionOpacity}]}>
            <View style={styles.shareButtonWrap}>
              <TouchableOpacity style={styles.shareButton} disabled={true}>
                <Ionicons name='md-share-alt' style={styles.shareIcon} />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsWrap}>
              <TouchableOpacity style={styles.modeButton} disabled={true}>
                {mode === 'hidden' && <Octicons name='telescope' style={styles.modeIcon} />}
                {mode === 'vip' && <Foundation name='ticket' style={styles.modeIcon} />}
                {mode === 'limitless' &&
                  <MaterialIcons name='all-inclusive' style={styles.modeIcon} />
                }
              </TouchableOpacity>
              {Array.isArray(members) && members.includes(currentUserID) &&
                <TouchableOpacity style={styles.memberButton} disabled>
                  <Ionicons name='md-person' color='#fefefe' style={styles.memberIcon} />
                </TouchableOpacity>
              }
            </View>
            <View style={styles.optionsWrap}>
              <SimpleLineIcons
                name='options'
                style={styles.options}
                onPress={this.openModal('', 'playlist')}
              />
            </View>
          </Animated.View> */}
        </Animated.View>
      </View>
    );
  }

  render() {
    const {isTrackMenuOpen, isPlaylistMenuOpen, selectedTrack, y} = this.state;
    const shadowOpacity = interpolate(y, {
      inputRange: [HEADER_DELTA - 1, HEADER_DELTA + 10],
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
      playlistToView,
      title,
      entities: {albums, playlists, sessions, tracks: trackEntities},
      playlists: {fetching, refreshing, error: playlistError},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {tracks, name, mode, members, large} = playlists.byID[playlistToView];
    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const queueHasTracks = sessionExists && userQueue.length > 0;
    const inSession = sessionExists
      && (
        sessions.byID[currentSessionID].listeners.includes(currentUserID)
        || sessions.byID[currentSessionID].ownerID === currentUserID
      );

    const newTracks = tracks.length === 1
      ? [...tracks, 'empty', 'empty-1']
      : tracks.length === 2
      ? [...tracks, 'empty']
      : [...tracks];

    return (
      <View style={styles.container}>
        <ImageCover {...{y, image: large, height: HEADER_MAX_HEIGHT}} />
        <AnimatedVirtualizedList
          data={newTracks}
          extraData={this.props}
          style={styles.list}
          renderItem={this.renderTrack(playlistToView)}
          keyExtractor={(item, index) => `${item}-${index}`}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
          removeClippedSubviews={false}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader({mode, members, currentUserID, tracks, y})}
          ListFooterComponent={this.renderFooter}
          bounces={true}
          refreshing={refreshing.includes('tracks')}
          onRefresh={this.handleRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
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
              onPress={this.navToDetails(playlistToView, title)}
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
          isVisible={isPlaylistMenuOpen}
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
          {this.renderModalContent('playlist', playlistToView)}
        </Modal>
        {(typeof selectedTrack === 'string' && trackEntities.byID[selectedTrack]) &&
          <AddToQueueDialog
            queueing={queueing}
            error={queueError}
            inSession={inSession}
            queueHasTracks={queueHasTracks}
            image={trackEntities.byID[selectedTrack].album.medium}
          />
        }
      </View>
    );
  }
}

PlaylistView.propTypes = {
  changeFavoriteTrack: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  getPlaylistTracks: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  playlistToView: PropTypes.string.isRequired,
  playTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  queueTrack: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, player, playlists, queue, sessions, settings, tracks, users}) {
  return {
    entities,
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
    changeFavoriteTrack,
    createSession,
    getPlaylistTracks,
    leaveSession,
    playTrack,
    queueTrack,
  },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);