"use strict";

import React from "react";
import PropTypes from "prop-types";
import FastImage from 'react-native-fast-image';
import {Text, View, VirtualizedList, ActivityIndicator, TouchableOpacity} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {onScroll} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import Modal from "react-native-modal";
import debounce from "lodash.debounce";
import moment from 'moment-timezone';
moment.tz.setDefault("America/Chicago");

// Styles
import styles from "./styles";

// Components
import AddToQueueDialog from "../../components/AddToQueueDialog";
import TrackCard from "../../components/TrackCard";
import LoadingTrack from "../../components/LoadingTrack";
import TrackModal from "../../components/TrackModal";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";

// Player Action Creators
import {playTrack} from "../../actions/player/PlayTrack";

// Queue Action Creators
import {queueTrack} from "../../actions/queue/QueueTrack";

// Sessions Action Creators
import {createSession} from "../../actions/sessions/CreateSession";
import {leaveSession} from "../../actions/sessions/LeaveSession";

// Tracks Action Creators
import {changeFavoriteTrack} from '../../actions/tracks/ChangeFavoriteTrack';
import {getTracks} from "../../actions/tracks/GetTracks";

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);
const {Value, interpolate, Extrapolate} = Animated;

class LibraryTracksView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrackMenuOpen: false,
      selectedTrack: "",
      y: new Value(0),
    }
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleChangeFavoriteTrack = this.handleChangeFavoriteTrack.bind(this);

    this._onEndReached = debounce(this.onEndReached, 50);
  }

  componentDidMount() {
    const {getTracks, tracks: {userTracks, lastUpdated}} = this.props;
    const last = moment(lastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a');
    const timeDiff = moment().diff(last, 'minutes', true);

    this.closeModal();

    if (!userTracks.length || timeDiff >= 1) {
      setTimeout(() => getTracks(true, 0), 100);
    }
  }

  openModal = selectedTrack => () => this.setState({selectedTrack, isTrackMenuOpen: true});

  closeModal = () => this.setState({isTrackMenuOpen: false});

  onEndReached() {
    const {getTracks, tracks: {fetching, userTracks, totalUserTracks}} = this.props;

    if (!fetching.includes('tracks') && userTracks.length && userTracks.length !== totalUserTracks) {
      getTracks(false, userTracks.length);
    }
  }

  handleRefresh() {
    const {getTracks, tracks: {refreshing}} = this.props;
    if (!refreshing) getTracks(true, 0);
  }

  renderTrack({item, index}) {
    const {
      entities: {tracks, users},
      users: {currentUserID: id},
    } = this.props;
    const {displayName} = users.byID[id];
    const {album, artists, name} = tracks.byID[item];

    return (
      <TrackCard
        key={`${item}-${index}`}
        albumName={album.name}
        type='basic'
        context={{id, displayName, type: 'user-tracks', name: displayName}}
        name={name}
        onPress={this.handlePlay(item, index)}
        openModal={this.openModal(item)}
        showOptions={true}
        artists={artists.map(a => a.name).join(', ')}
      />
    );
  }

  renderFooter() {
    const {tracks: {fetching, refreshing, userTracks, totalUserTracks}} = this.props;

    if (
      !fetching.includes('tracks')
      || refreshing
      || !userTracks.length
      || userTracks.length === totalUserTracks
    ) return <View></View>;

    return (
      <View style={styles.footer}>
        <FastImage style={styles.loadingGif} source={require('../../images/loading.gif')} />
      </View>
    );
  }

  handlePlay = (trackID, trackIndex) => () => {
    const {
      createSession,
      playTrack,
      leaveSession,
      entities: {albums, queueTracks, sessions, tracks, users},
      player: {prevQueueID, prevTrackID, nextQueueID, nextTrackID, currentQueueID},
      queue: {unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, infoUnsubscribe},
      settings: {preference: {session: mode}},
      tracks: {userTracks, totalUserTracks},
      users: {currentUserID},
    } = this.props;
    const session = sessions.byID[currentSessionID];
    const track = session ? tracks.byID[session.currentTrackID] : null;
    const queueTrack = session ? queueTracks.byID[session.currentQueueID] : null;
    const {displayName, profileImage, totalFollowers} = users.byID[currentUserID];
    const trackToPlay = tracks.byID[trackID];
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
              nextQueueID,
              nextTrackID,
              track,
              id: currentQueueID,
              totalLikes: queueTrack.totalLikes,
              userID: queueTrack.userID,
            },
          },
          {
            displayName,
            id: currentUserID,
            name: displayName,
            type: 'user-tracks',
            total: totalUserTracks,
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
          id: currentUserID,
          name: displayName,
          type: 'user-tracks',
          total: totalUserTracks,
          position: trackIndex,
          tracks: userTracks.slice(trackIndex + 1, trackIndex + 4),
        },
        mode,
      );
    }
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

        queueTrack(session, track, user);
        this.closeModal();
      }
    }
  }

  renderModalContent() {
    const {selectedTrack} = this.state;
    const {
      entities: {queueTracks, sessions, tracks, users},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (!selectedTrack || !tracks.allIDs.includes(selectedTrack)) return <View></View>;

    const {favoriteTrackID} = users.byID[currentUserID];
    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const songQueued = userQueue.map(o => o.trackID).includes(selectedTrack);
    const isListenerOwner = sessionExists
      && (
        sessions.byID[currentSessionID].listeners.includes(currentUserID)
        || sessions.byID[currentSessionID].ownerID === currentUserID
      );

    return (
      <TrackModal
        trackID={selectedTrack}
        closeModal={this.closeModal}
        queueTrack={this.handleAddTrack}
        name={tracks.byID[selectedTrack].name}
        artists={tracks.byID[selectedTrack].artists.map(a => a.name).join(', ')}
        albumName={tracks.byID[selectedTrack].album.name}
        albumImage={tracks.byID[selectedTrack].album.small}
        trackInQueue={songQueued}
        isListenerOwner={sessionExists ? isListenerOwner : null}
        isFavorite={favoriteTrackID === selectedTrack}
        setFavoriteTrack={this.handleChangeFavoriteTrack(selectedTrack)}
      />
    );
  }

  handleChangeFavoriteTrack = trackID => () => {
    const {changeFavoriteTrack, users: {currentUserID}} = this.props;
    this.closeModal();
    changeFavoriteTrack(currentUserID, trackID);
  }

  render() {
    const {isTrackMenuOpen, selectedTrack, y} = this.state;
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    const {
      entities: {albums, sessions, tracks},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID},
      tracks: {userTracks, fetching, refreshing, error: trackError},
      users: {currentUserID},
    } = this.props;
    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const queueHasTracks = sessionExists && userQueue.length > 0;
    const inSession = sessionExists
      && (
        sessions.byID[currentSessionID].listeners.includes(currentUserID)
        || sessions.byID[currentSessionID].ownerID === currentUserID
      );

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <TouchableOpacity
              style={styles.leftIconButton}
              onPress={Actions.pop}
              activeOpacity={0.5}
            >
              <Ionicons name="ios-arrow-back" style={styles.leftIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Songs</Text>
            <View style={styles.rightIcon} />
          </View>
        </Animated.View>
        {userTracks.length !== 0 &&
          <AnimatedVirtualizedList
            data={userTracks}
            extraData={this.props}
            style={styles.scrollContainer}
            renderItem={this.renderTrack}
            keyExtractor={(item, index) => `${item}-${index}`}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            ListHeaderComponent={<View />}
            ListFooterComponent={this.renderFooter}
            removeClippedSubviews={false}
            onScroll={onScroll({y})}
            scrollEventThrottle={16}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
          />
        }
        {(userTracks.length === 0 || !userTracks.length) &&
          <View style={styles.tracksWrap}>
            {(!fetching.includes('tracks') && trackError) && <Text>There was an error.</Text>}
            {(fetching.includes('tracks') || (!fetching.includes('tracks') && !trackError)) &&
              <View>
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
              </View>
            }
          </View>
        }
        <Modal
          isVisible={isTrackMenuOpen}
          backdropColor={"#1b1b1e"}
          backdropOpacity={0.7}
          animationIn="slideInUp"
          animationInTiming={230}
          backdropTransitionInTiming={230}
          animationOut="slideOutDown"
          animationOutTiming={230}
          backdropTransitionOutTiming={230}
          hideModalContentWhileAnimating
          useNativeDriver={true}
          style={styles.modal}
          onBackdropPress={this.closeModal}
        >
          {this.renderModalContent()}
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

LibraryTracksView.propTypes = {
  changeFavoriteTrack: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  getTracks: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  queueTrack: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
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
    getTracks,
    leaveSession,
    playTrack,
    queueTrack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryTracksView);