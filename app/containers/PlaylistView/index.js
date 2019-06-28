'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  VirtualizedList,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import debounce from "lodash.debounce";
import Interactable from 'react-native-interactable';
import Modal from 'react-native-modal';
import styles from './styles';

// Components
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

const HEADER_MAX_HEIGHT = 261;
const HEADER_MIN_HEIGHT = 65;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class PlaylistView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      scrollEnabled: false,
      isOpen: true,
      isPlaylistMenuOpen: false,
      isTrackMenuOpen: false,
      selectedTrack: '',
      canPaginate: true,
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
    this.onScroll = this.onScroll.bind(this);
    this.onPanelDrag = this.onPanelDrag.bind(this);

    this._deltaY = new Animated.Value(0);
    this._onEndReached = debounce(this.onEndReached, 1000);
  }

  componentDidMount() {
    const {getPlaylistTracks, playlistToView, playlists: {playlistsByID}} = this.props;

    this.closeModal();

    if (
      playlistToView
      && !playlistsByID[playlistToView].tracks.length
    ) {
      getPlaylistTracks(playlistToView);
    }
  }

  componentDidUpdate(prevProps) {
    const {playlists: {fetchingTracks: oldFetching, playlistsByID: oldPlaylists}} = prevProps;
    const {playlistToView, playlists: {fetchingTracks, playlistsByID, error}} = this.props;
    if (
      playlistToView
      && oldFetching
      && !fetchingTracks
      && oldPlaylists[playlistToView].tracks.length === playlistsByID[playlistToView].tracks.length
      && !error
    ) {
      this.setState({canPaginate: false});
    }
  }

  onEndReached() {
    const {canPaginate} = this.state;
    const {getPlaylistTracks, playlistToView, playlists: {fetchingTracks, playlistsByID}} = this.props;

    if (
      fetchingTracks
      || !playlistToView
      || !playlistsByID[playlistToView].tracks.length
      || !canPaginate
    ) return;

    getPlaylistTracks(playlistToView, false, playlistsByID[playlistToView].tracks.length);
  }

  handleRefresh() {
    const {getPlaylistTracks, playlistToView, playlists: {refreshingTracks}} = this.props;

    if (refreshingTracks || !playlistToView) return;

    getPlaylistTracks(playlistToView, true);
  }

  renderFooter() {
    const {playlists: {fetchingTracks, refreshingTracks}} = this.props;

    if (!fetchingTracks || refreshingTracks) return <View></View>;

    return <LoadingTrack type='cover' />;
  }

  navToDetails = (playlistToView, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libraryPlaylistDetails({playlistToView});
        return;
      case 'Profile':
        Actions.profilePlaylistDetails({ playlistToView });
        return;
      default:
        return;
    }
  }

  renderTrack = playlistToView => ({item, index}) => {
    const {
      albums: {albumsByID},
      playlists: {playlistsByID, playlistTracksByID},
      tracks: {tracksByID},
      users: {usersByID, currentUserID},
    } = this.props;
    const {trackID} = playlistTracksByID[item];
    const {name, artists, albumID} = tracksByID[trackID];
    const {medium, name: albumName} = albumsByID[albumID];
    const {ownerID, name: playlistName} = playlistsByID[playlistToView];
    const displayName = ownerID === 'spotify' ? 'Spotify' : ownerID;

    return (
      <TrackCard
        key={item}
        albumName={albumName}
        type='cover'
        context={{displayName, name: playlistName, id: playlistToView, type: 'playlist'}}
        name={name}
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

  handlePlay() {
    console.log('play pressed');
  }

  renderModalContent(type, item) {
    const {
      albums: {albumsByID},
      artists: {artistsByID},
      playlists: {playlistsByID, playlistTracksByID},
      queue: {userQueue, queueByID},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;

    if (
      !item
      || (type === 'track' && !playlistTracksByID[item])
      || (type === 'playlist' && !playlistsByID[item])
    ) return <View></View>;

    switch (type) {
      case 'track': {
        const {trackID} = playlistTracksByID[item];
        const {name, albumID, artists} = tracksByID[trackID];
        const {medium, name: albumName} = albumsByID[albumID];
        const sessionExists = currentSessionID && sessionsByID[currentSessionID];
        const songQueued = userQueue.map(id => queueByID[id].trackID).includes(trackID);
        const isListenerOwner = sessionExists
          && (
            sessionsByID[currentSessionID].listeners.includes(currentUserID)
            || sessionsByID[currentSessionID].ownerID === currentUserID
          );

        return (
          <TrackModal
            trackID={trackID}
            closeModal={this.closeModal}
            queueTrack={this.handleAddTrack}
            name={name}
            artists={artists.map(a => a.name).join(', ')}
            albumName={albumName}
            albumImage={medium}
            trackInQueue={songQueued}
            isListenerOwner={isListenerOwner}
          />
        );
      }
      case 'playlist': {
        const {name, medium, ownerID, members} = playlistsByID[item];
        const {displayName} = usersByID[ownerID];
        const {displayName: currentName} = usersByID[currentUserID];
        const isOwnerMember = ownerID === currentUserID || members.includes(currentUserID);
        const ownerName = displayName && displayName !== currentName
          ? displayName
          : ownerID === 'spotify'
          ? 'Spotify'
          : null;

        return (
          <PlaylistModal
            closeModal={this.closeModal}
            name={name}
            image={medium}
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

  closeModal() {
    this.setState({isTrackMenuOpen: false, isPlaylistMenuOpen: false});
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
    const { isOpen, scrollEnabled } = this.state;

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
    const {
      isTrackMenuOpen,
      isPlaylistMenuOpen,
      scrollEnabled,
      selectedTrack,
      scrollY: y,
    } = this.state;
    const {
      playlistToView,
      title,
      albums: {albumsByID},
      playlists: {playlistsByID, fetchingTracks, refreshingTracks, error: playlistError},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID},
    } = this.props;
    const {tracks, name, mode, members, large} = playlistsByID[playlistToView];
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
          <Animated.View style={[styles.animatedHeader, {height: headerHeight}]}>
          </Animated.View>
        </View>
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -(HEADER_SCROLL_DISTANCE)}]}
          boundaries={{top: -(HEADER_SCROLL_DISTANCE), bottom: 0}}
          animatedValueY={this._deltaY}
          onDrag={this.onPanelDrag}
        >
          {tracks.length !== 0 &&
            <VirtualizedList
              ref='TrackList'
              data={tracks}
              extraData={this.props}
              style={styles.list}
              renderItem={this.renderTrack(playlistToView)}
              keyExtractor={item => item}
              getItem={(data, index) => data[index]}
              getItemCount={data => data.length}
              removeClippedSubviews={false}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<View />}
              ListFooterComponent={this.renderFooter}
              ListEmptyComponent={<Text>Nothing to show</Text>}
              canCancelContentTouches={scrollEnabled}
              scrollEnabled={scrollEnabled}
              bounces={true}
              refreshing={refreshingTracks}
              onRefresh={this.handleRefresh}
              onEndReached={this._onEndReached}
              onEndReachedThreshold={0.7}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y}}}],
                {listener: this.onScroll},
              )}
            />
          }
          {(tracks.length === 0 || !tracks.length) &&
            <View style={styles.scrollWrap}>
              {(fetchingTracks && !playlistError) && (
                <View>
                  <LoadingTrack type='cover' />
                  <LoadingTrack type='cover' />
                  <LoadingTrack type='cover' />
                  <LoadingTrack type='cover' />
                  <LoadingTrack type='cover' />
                  <LoadingTrack type='cover' />
                  <LoadingTrack type='cover' />
                </View>
              )}
              {(!fetchingTracks && !playlistError) &&
                <TouchableHighlight style={styles.addPlaylistTrack}>
                  <View style={styles.addPlaylistTrackWrap}>
                    <View style={styles.addPlaylistTrackImage}>
                      <MaterialCommunityIcons name='plus' color='#fefefe' style={styles.plus} />
                    </View>
                    <Text style={styles.addPlaylistTrackText}>Add tracks...</Text>
                    <SimpleLineIcons name='options' color='#888' style={styles.options} />
                  </View>
                </TouchableHighlight>
              }
              {(!fetchingTracks && playlistError) &&
                <View style={styles.playlistTrackError}>
                  <Text style={styles.playlistTrackErrorText}>Unable to load playlist tracks</Text>
                </View>
              }
            </View>
          }
        </Interactable.View>
        <Animated.View
          style={[
            styles.animatedShadow,
            {height: headerHeight, shadowOpacity: headerShadowOpacity},
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
              onPress={this.navToDetails(playlistToView, title)}
            />
          </View>
          <Animated.View
            style={[
              styles.playButtonWrap,
              {opacity: playButtonOpacity, bottom: playButtonOffset}
            ]}
          >
            <PlayButton play={this.handlePlay} disabled={true} />
          </Animated.View>
          <Animated.View
            style={[
              styles.headerBottomOptions,
              {opacity: headerOptionsOpacity, bottom: headerOptionsOffset},
            ]}
          >
            <View style={styles.shareButtonWrap}>
              <TouchableOpacity style={styles.shareButton} disabled={true}>
                <Ionicons name='md-share-alt' style={styles.shareIcon} />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.playlistDetailsWrap}>
              <TouchableOpacity style={styles.playlistModeButton} disabled={true}>
                {mode === 'hidden' && <Octicons name='telescope' style={styles.playlistModeIcon} />}
                {mode === 'vip' && <Foundation name='ticket' style={styles.playlistModeIcon} />}
                {mode === 'limitless' &&
                  <MaterialIcons name='all-inclusive' style={styles.playlistModeIcon} />
                }
              </TouchableOpacity>
              {members.includes(currentUserID) &&
                <TouchableOpacity style={styles.playlistMemberButton} disabled>
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

PlaylistView.propTypes = {
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  createSession: PropTypes.func.isRequired,
  getPlaylistTracks: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  playlistToView: PropTypes.string.isRequired,
  playTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  queueTrack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, player, playlists, queue, sessions, tracks, users}) {
  return {
    albums,
    artists,
    player,
    playlists,
    queue,
    sessions,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    getPlaylistTracks,
    leaveSession,
    playTrack,
    queueTrack,
  },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);