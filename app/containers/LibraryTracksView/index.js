"use strict";

import React from "react";
import PropTypes from "prop-types";
import {Text, View, Animated, Easing, VirtualizedList, ActivityIndicator} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import debounce from "lodash.debounce";
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
import {getTracks} from "../../actions/tracks/GetTracks";

class LibraryTracksView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrackMenuOpen: false,
      selectedTrack: "",
    }
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);

    this.shadowOpacity = new Animated.Value(0);

    this._onEndReached = debounce(this.onEndReached, 1000);
  }

  componentDidMount() {
    const {getTracks, tracks: {userTracks}} = this.props;

    this.closeModal();

    if (!userTracks.length) {
      getTracks(true, 0);
    }
  }

  openModal = selectedTrack => () => {
    this.setState({selectedTrack, isTrackMenuOpen: true});
  }

  closeModal() {
    this.setState({isTrackMenuOpen: false});
  }

  onEndReached() {
    const {getTracks, tracks: {fetchingTracks, userTracks}} = this.props;

    if (fetchingTracks || !userTracks.length) return;

    getTracks(false, userTracks.length);
  }

  handleRefresh() {
    const {getTracks, tracks: {refreshingTracks}} = this.props;

    if (refreshingTracks) return;

    getTracks(true, 0);
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    if (y > 0) {
      if (this.shadowOpacity != 0.9) {
        Animated.timing(this.shadowOpacity, {
          toValue: 0.9,
          duration: 75,
          easing: Easing.linear,
        }).start();
      };
    } else {
      Animated.timing(this.shadowOpacity, {
        toValue: 0,
        duration: 75,
        easing: Easing.linear,
      }).start()
    }
  }

  renderTrack({item}) {
    const {
      albums: {albumsByID},
      tracks: {tracksByID},
      users: {usersByID, currentUserID: id},
    } = this.props;
    const {displayName} = usersByID[id];
    const {albumID, artists, name} = tracksByID[item];
    const {name: albumName} = albumsByID[albumID];

    return (
      <TrackCard
        key={item}
        albumName={albumName}
        type='basic'
        context={{id, displayName, type: 'user-tracks', name: displayName}}
        name={name}
        openModal={this.openModal}
        showOptions={true}
        artists={artists.map(a => a.name).join(', ')}
      />
    );
  }

  renderFooter() {
    const {tracks: {fetchingTracks, refreshingTracks}} = this.props;

    if (!fetchingTracks || refreshingTracks) return null;

    return (
      <View style={{paddingTop: 20, paddingBottom: 40}}>
        <ActivityIndicator size="small" animating={true} color="#888" />
      </View>
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

  renderModalContent() {
    const {selectedTrack} = this.state;
    const {
      albums: {albumsByID},
      queue: {userQueue},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID},
    } = this.props;
    const isListenerOwner = sessionsByID[currentSessionID].listeners.indexOf(currentUserID) !== -1
      || sessionsByID[currentSessionID].ownerID === currentUserID;

    return (
      <TrackModal
        closeModal={this.closeModal}
        queueTrack={this.handleAddTrack}
        name={tracksByID[selectedTrack].name}
        artists={tracksByID[selectedTrack].artists.map(a => a.name).join(', ')}
        albumName={albumsByID[tracksByID[selectedTrack].albumID].name}
        albumImage={albumsByID[tracksByID[selectedTrack].albumID].small}
        trackID={selectedTrack}
        trackInQueue={userQueue.includes(selectedTrack)}
        isListenerOwner={isListenerOwner}
      />
    );
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {isTrackMenuOpen, selectedTrack} = this.state;
    const {
      albums: {albumsByID},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID, sessionsByID},
      tracks: {userTracks, fetchingTracks, refreshingTracks, tracksByID, error: trackError},
      users: {currentUserID},
    } = this.props;
    const session = sessionsByID[currentSessionID];
    const inSession = session
      && session.listeners.indexOf(currentUserID) !== -1
      || session.ownerID === currentUserID;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Ionicons
              name="ios-arrow-back"
              color="#fefefe"
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text style={styles.title}>Songs</Text>
            <View style={styles.rightIcon} />
          </View>
        </Animated.View>
        {userTracks.length !== 0 &&
          <VirtualizedList
            data={userTracks}
            extraData={this.props}
            style={styles.scrollContainer}
            renderItem={this.renderTrack}
            keyExtractor={item => item}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            ListHeaderComponent={<View />}
            ListFooterComponent={this.renderFooter}
            removeClippedSubviews={false}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshingTracks}
            onRefresh={this.handleRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.7}
          />
        }
        {(userTracks.length === 0 || !userTracks.length) &&
          <View style={styles.scrollContainer}>
            <View style={styles.scrollWrap}>
            {fetchingTracks &&
                <View>
                  <LoadingTrack />
                  <LoadingTrack />
                  <LoadingTrack />
                  <LoadingTrack />
                  <LoadingTrack />
                </View>
              }
              {!fetchingTracks && !trackError && <Text>Nothing to show</Text>}
              {!fetchingTracks && trackError && <Text>There was an error.</Text>}
            </View>
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
        <AddToQueueDialog
          queueing={queueing}
          error={queueError}
          inSession={inSession}
          queueHasTracks={userQueue.length > 0}
          image={albumsByID[tracksByID[selectedTrack].albumID].medium}
        />
      </View>
    );
  }
}

LibraryTracksView.propTypes = {
  addRecentTrack: PropTypes.func.isRequired,
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  createSession: PropTypes.func.isRequired,
  getTracks: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  queueTrack: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
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
    getTracks,
    leaveSession,
    playTrack,
    queueTrack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryTracksView);