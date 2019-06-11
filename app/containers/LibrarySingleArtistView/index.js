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
const HEADER_MIN_HEIGHT = 85;
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
    const {small, name: albumName} = albumsByID[albumID];
    const {name: artistName} = artistsByID[artistToView];

    return (
      <TrackCard
        key={item.id}
        albumName={albumName}
        type='cover'
        context={{displayName, name: artistName, id: artistToView, type: 'user-artist'}}
        name={name}
        openModal={this.openModal}
        showOptions={true}
        showSquareImage={true}
        image={small}
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

      if (isListenerOwner && !songQueued) {
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
      queue: {userQueue, queueByID},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
    } = this.props;

    if (!selectedTrack || !tracksByID[selectedTrack]) return null;

    const {listeners, ownerID} = sessionsByID[currentSessionID];
    const isListenerOwner = listeners.indexOf(currentUserID) !== -1 || ownerID === currentUserID;
    const songQueued = userQueue.map(id => queueByID[id].trackID).indexOf(selectedTrack) !== -1;

    switch (type) {
      case 'track':
        return (
          <TrackModal
            trackID={item}
            closeModal={this.closeModal}
            queueTrack={this.handleAddTrack}
            name={tracksByID[selectedTrack].name}
            artists={tracksByID[selectedTrack].artists.map(a => a.name).join(', ')}
            albumName={albumsByID[tracksByID[selectedTrack].albumID].name}
            albumImage={albumsByID[tracksByID[selectedTrack].albumID].small}
            trackInQueue={songQueued}
            isListenerOwner={isListenerOwner}
          />
        );
      case 'artist':
        return (
          <ArtistModal
            artistImage={artistsByID[item].small}
            artistName={artistsByID[item].name}
            closeModal={this.closeModal}
          />
        );
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
      sessions: {sessionsByID, currentSessionID},
      tracks: {tracksByID},
      queue: {queueing, error: queueError},
      users: {currentUserID},
    } = this.props;
    const {userTracks, name, large} = artistsByID[artistToView];
    const {medium} = albumsByID[tracksByID[selectedTrack].albumID];
    const session = sessionsByID[currentSessionID];
    const inSession = session
      && session.listeners.indexOf(currentUserID) !== -1
      || session.ownerID === currentUserID;

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
              keyExtractor={item => item.id}
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
          {userTracks.length === 0 || !userTracks.length &&
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
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={this.navBack}
            />
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            <Ionicons
              name='md-information-circle'
              color='#fefefe'
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
            <PlayButton play={this.handlePlay} disabled={true} />
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
              color='#fefefe'
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
        <AddToQueueDialog
          queueing={queueing}
          error={queueError}
          inSession={inSession}
          queueHasTracks={userQueue.length > 0}
          image={medium}
        />
      </View>
    );
  }
}

LibrarySingleArtistView.propTypes = {
  albums: PropTypes.object,
  artists: PropTypes.object,
  artistToView: PropTypes.string,
  createSession: PropTypes.func,
  leaveSession: PropTypes.func,
  playlists: PropTypes.object,
  playTrack: PropTypes.func,
  queueTrack: PropTypes.func,
  sessions: PropTypes.object,
  settings: PropTypes.object,
  tracks: PropTypes.object,
  users: PropTypes.object,
};

function mapStateToProps({ albums, artists, playlists, sessions, settings, tracks, users }) {
  return {
    albums,
    artists,
    playlists,
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