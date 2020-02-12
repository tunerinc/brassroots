"use strict";

import React from "react";
import PropTypes from "prop-types";
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing, FlatList} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {onScroll} from 'react-native-redash';
import Reanimated from 'react-native-reanimated';
import Modal from "react-native-modal";

// Styles
import styles from "./styles";

// Components
import AddToQueueDialog from "../../components/AddToQueueDialog";
import PlaylistCard from "../../components/PlaylistCard";
import LoadingPlaylist from "../../components/LoadingPlaylist";
import TrackCard from "../../components/TrackCard";
import LoadingTrack from "../../components/LoadingTrack";
import TrackModal from "../../components/TrackModal";
import MusicSection from '../../components/MusicSection';

// Icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Player Action Creators
import {playTrack} from "../../actions/player/PlayTrack";

// Queue Action Creators
import {queueTrack} from "../../actions/queue/QueueTrack";

// Sessions Action Creators
import {createSession} from "../../actions/sessions/CreateSession";
import {leaveSession} from "../../actions/sessions/LeaveSession";

// Tracks Action Creators
import {getMostPlayedTracks} from "../../actions/tracks/GetMostPlayedTracks";
import {getRecentTracks} from "../../actions/tracks/GetRecentTracks";

const {Value, interpolate, Extrapolate} = Reanimated;

class LibraryTabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: true,
      isTrackMenuOpen: false,
      selectedTrack: "",
      y: new Value(0),
      shadowOpacity: new Animated.Value(0),
      syncIndex: new Animated.Value(5),
      syncOpacity: new Animated.Value(1),
      syncContentOpacity: new Animated.Value(1),
    };

    this.navToLibrary = this.navToLibrary.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
  }

  componentDidMount() {
    const {syncContentOpacity, syncOpacity, syncIndex} = this.state;

    Animated.sequence([
      Animated.timing(syncContentOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }),
      Animated.timing(syncOpacity, {
        toValue: 0,
        duration: 300,
        delay: 300,
        easing: Easing.linear
      }),
      Animated.timing(syncIndex, {
        toValue: -5,
        duration: 1,
        delay: 600,
        easing: Easing.linear
      })
    ]).start();
  }

  navToLibrary = route => () => {
    const {users: {currentUserID}} = this.props;

    switch (route) {
      case "playlists":
        Actions.libPlaylists();
        return;
      case "albums":
        Actions.libAlbums();
        return;
      case "tracks":
        Actions.libTracks();
        return;
      case "recent":
        Actions.libRecentlyPlayed({selectedUser: currentUserID});
        return;
      case "top":
        Actions.libTopPlaylists({selectedUser: currentUserID});
        return;
      case "most":
        Actions.libMostPlayed({selectedUser: currentUserID});
      default:
        return;
    }
  }

  navToPlaylist = playlistID => () => Actions.proSinglePlaylist({playlistToView: playlistID});

  renderPlaylist({item}) {
    const {
      entities: {playlists, users},
      users: {currentUserID},
    } = this.props;

    if (!item || !playlists.allIDs.includes(item)) return null;

    const {image, name, members, mode, ownerID, ownerType} = playlists.byID[item];
    const ownerName = ownerID === 'spotify'
      ? 'Spotify'
      : ownerID !== currentUserID && users.allIDs.includes(ownerID)
      ? users.byID[ownerID].displayName
      : null;

    return (
      <PlaylistCard
        key={item}
        image={image}
        isMember={members.includes(currentUserID)}
        name={name}
        navToPlaylist={this.navToPlaylist(item)}
        mode={mode}
        ownerName={ownerName}
      />
    );
  }

  renderTrack = type => ({item, index}) => {
    const {
      entities: {tracks, users},
      users: {currentUserID},
    } = this.props;
    const {displayName} = users.byID[currentUserID];

    if (!item || !tracks.allIDs.includes(item)) return null;

    const {name, album, artists} = tracks.byID[item];

    return (
      <TrackCard
        key={item}
        type='cover'
        context={{type, displayName, id: currentUserID, name: displayName}}
        openModal={this.openModal(item)}
        name={name}
        artists={artists.map(a => a.name).join(', ')}
        showSquareImage={true}
        showOptions={true}
        image={album.small}
        albumName={album.name}
      />
    );
  }

  openModal = selectedTrack => () => this.setState({selectedTrack, isTrackMenuOpen: true});

  closeModal = () => this.setState({isTrackMenuOpen: false});

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

  renderModalContent() {
    const {selectedTrack} = this.state;
    const {
      entities: {albums, queueTracks, sessions, tracks},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (!selectedTrack || !tracks.allIDs.includes(selectedTrack)) return <View></View>;

    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const songQueued = userQueue.map(id => queueByID[id].trackID).includes(selectedTrack);
    const isListenerOwner = sessionExists
      && (
        sessionsByID[currentSessionID].listeners.includes(currentUserID)
        || sessionsByID[currentSessionID].ownerID === currentUserID
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
      />
    );
  }

  render() {
    const {
      scrollEnabled,
      isTrackMenuOpen,
      selectedTrack,
      syncOpacity,
      syncIndex,
      y,
    } = this.state;
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    const {
      entities: {albums, sessions, tracks, users},
      playlists: {fetching: playlistFetching, error: playlistError},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID},
      tracks: {fetching: trackFetching, error: trackError},
      users: {currentUserID, error: userError},
    } = this.props;
    const {mostPlayed, recentlyPlayed, topPlaylists} = users.byID[currentUserID];
    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const queueHasTracks = sessionExists && userQueue.length > 0;
    const inSession = sessionExists
      && (
        sessions.byID[currentSessionID].listeners.includes(currentUserID)
        || sessions.byID[currentSessionID].ownerID === currentUserID
      );

    return (
      <View style={styles.container}>
        <Animated.View style={[
            styles.syncScreen,
            {opacity: syncOpacity, zIndex: syncIndex},
          ]}></Animated.View>
        <Reanimated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <View style={styles.leftIcon}></View>
            <Text style={styles.title}>Library</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Reanimated.View>
        <Reanimated.ScrollView
          style={styles.libraryWrap}
          onScroll={onScroll({y})}
          scrollEventThrottle={1}
          scrollEnabled={scrollEnabled}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.libraryOption} onPress={this.navToLibrary("playlists")}>
            <MaterialIcons name="library-books" style={styles.libraryOptionIcon} />
            <Text style={styles.libraryOptionText}>Playlists</Text>
            <Ionicons name="ios-arrow-forward" style={styles.libraryOptionArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryOption} onPress={this.navToLibrary("albums")}>
            <MaterialCommunityIcons name="album" style={styles.libraryOptionIcon} />
            <Text style={styles.libraryOptionText}>Albums</Text>
            <Ionicons name="ios-arrow-forward" Color="#fefefe" style={styles.libraryOptionArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryOption} onPress={this.navToLibrary("tracks")}>
            <Ionicons name="ios-musical-notes" style={styles.libraryOptionIcon} />
            <Text style={styles.libraryOptionText}>Songs</Text>
            <Ionicons name="ios-arrow-forward" style={styles.libraryOptionArrow} />
          </TouchableOpacity>
          {/* <MusicSection
            renderItem={this.renderTrack('user-recently')}
            viewMore={this.navToLibrary('recent')}
            type='recent'
            title='Recently Played'
            items={recentlyPlayed}
            showError={typeof trackError === Error}
            fetching={trackFetching.includes('recent')}
          />
          <MusicSection
            renderItem={this.renderPlaylist}
            viewMore={this.navToLibrary('top')}
            type='top'
            title='Top Playlists'
            items={topPlaylists}
            showError={typeof playlistError === Error}
            fetching={playlistFetching.includes('topPlaylists')}
          />
          <MusicSection
            renderItem={this.renderTrack('user-most')}
            viewMore={this.navToLibrary('most')}
            type='most'
            title='Most Played'
            items={mostPlayed}
            showError={typeof trackError === Error}
            fetching={trackFetching.includes('mostPlayed')}
          /> */}
        </Reanimated.ScrollView>
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

LibraryTabView.propTypes = {
  createSession: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  getMostPlayedTracks: PropTypes.func.isRequired,
  getRecentTracks: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  queue: PropTypes.object.isRequired,
  queueTrack: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, player, playlists, queue, sessions, tracks, users}) {
  return {
    entities,
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
    getMostPlayedTracks,
    getRecentTracks,
    leaveSession,
    playTrack,
    queueTrack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryTabView);
