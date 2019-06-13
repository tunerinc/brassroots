"use strict";

import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  FlatList
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import AddToQueueDialog from "../../components/AddToQueueDialog";
import PlaylistCard from "../../components/PlaylistCard";
import LoadingPlaylist from "../../components/LoadingPlaylist";
import TrackCard from "../../components/TrackCard";
import LoadingTrack from "../../components/LoadingTrack";
import TrackModal from "../../components/TrackModal";
import styles from "./styles";

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

class LibraryTabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: true,
      isTrackMenuOpen: false,
      selectedTrack: "",
    };

    this.removeSyncScreen = this.removeSyncScreen.bind(this);
    this.navToLibrary = this.navToLibrary.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);

    this.shadowOpacity = new Animated.Value(0);
    this.syncIndex = new Animated.Value(5);
    this.syncOpacity = new Animated.Value(1);
    this.syncContentOpacity = new Animated.Value(1);
  }

  componentDidMount() {
    this.removeSyncScreen();
  }

  removeSyncScreen() {
    Animated.sequence([
      Animated.timing(this.syncContentOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }),
      Animated.timing(this.syncOpacity, {
        toValue: 0,
        duration: 300,
        delay: 300,
        easing: Easing.linear
      }),
      Animated.timing(this.syncIndex, {
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
        Actions.libraryPlaylists();
        return;
      case "artists":
        Actions.libraryArtists();
        return;
      case "albums":
        Actions.libraryAlbums();
        return;
      case "tracks":
        Actions.libraryTracks();
        return;
      case "recent":
        Actions.libraryRecentlyPlayed({selectedUser: currentUserID});
        return;
      case "top":
        Actions.libraryTopPlaylists({selectedUser: currentUserID});
        return;
      case "most":
        Actions.libraryMostPlayed({selectedUser: currentUserID});
      default:
        return;
    }
  }

  navToPlaylist = playlistID => () => {
    Actions.profileSinglePlaylist({playlistToView: playlistID});
  }

  renderPlaylist({item}) {
    const {playlists: {playlistsByID}, users: {currentUserID, usersByID}} = this.props;

    if (!item || !playlistsByID[item]) return null;

    const {image, name, members, mode, ownerID, ownerType} = playlistsByID[item];
    const ownerName = ownerID === 'spotify'
      ? 'Spotify'
      : ownerID !== currentUserID && usersByID[ownerID]
      ? usersByID[ownerID].displayName
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
      albums: {albumsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {displayName} = usersByID[currentUserID];

    if (!item || !tracksByID[item]) return null;

    const {albumID, artists} = tracksByID[item];
    const {small, name: albumName} = albumsByID[albumID];
    const artistNames = artists.map(a => a.name).join(', ');

    return (
      <TrackCard
        key={item}
        type='cover'
        context={{type, displayName, id: currentUserID, name: displayName}}
        openModal={this.openModal(item)}
        name={name}
        artists={artistNames}
        showSquareImage={true}
        showOptions={true}
        image={small}
        albumName={albumName}
      />
    );
  }

  openModal = selectedTrack => () => {
    this.setState({selectedTrack, isTrackMenuOpen: true});
  }

  closeModal() {
    this.setState({isTrackMenuOpen: false});
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

  handleAddTrack() {
    const {selectedTrack} = this.state;
    const {
      queueTrack,
      albums: {albumsByID},
      artists: {artistsByID},
      player: {prevQueueID},
      queue: {userQueue, queueByID, totalQueue},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;

    if (currentSessionID && sessionsByID[currentSessionID]) {
      const {listeners, ownerID} = sessionsByID[currentSessionID];
      const isListenerOwner = listeners.includes(currentUserID) || ownerID === currentUserID;
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
      queue: {userQueue, queueByID},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID},
    } = this.props;

    if (!selectedTrack || !tracksByID[selectedTrack]) return null;

    const sessionExists = currentSessionID && sessionsByID[currentSessionID];
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
        name={tracksByID[selectedTrack].name}
        artists={tracksByID[selectedTrack].artists.map(a => a.name).join(', ')}
        albumName={albumsByID[tracksByID[selectedTrack].albumID].name}
        albumImage={albumsByID[tracksByID[selectedTrack].albumID].small}
        trackInQueue={songQueued}
        isListenerOwner={sessionExists ? isListenerOwner : null}
      />
    );
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {scrollEnabled, isTrackMenuOpen, selectedTrack} = this.state;
    const {
      albums: {albumsByID},
      playlists: {fetchingTopPlaylists, error: playlistError},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID, fetchingRecent, fetchingMostPlayed, error: trackError},
      users: {currentUserID, usersByID, error: userError},
    } = this.props;
    const {mostPlayed, recentlyPlayed, topPlaylists} = usersByID[currentUserID];
    const sessionExists = currentSessionID && sessionsByID[currentSessionID];
    const queueHasTracks = sessionExists && userQueue.length > 0;
    const inSession = sessionExists
      && (
        sessionsByID[currentSessionID].listeners.includes(currentUserID)
        || sessionsByID[currentSessionID].ownerID === currentUserID
      );

    return (
      <View style={styles.container}>
        <Animated.View style={[
            styles.syncScreen,
            {opacity: this.syncOpacity, zIndex: this.syncIndex},
          ]}></Animated.View>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <View style={styles.leftIcon}></View>
            <Text style={styles.title}>Library</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView
          style={styles.libraryWrap}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          scrollEnabled={scrollEnabled}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.libraryOption} onPress={this.navToLibrary("playlists")}>
            <MaterialIcons
              name="library-books"
              size={50}
              color="#fefefe"
              style={styles.libraryOptionIcon}
            />
            <Text style={styles.libraryOptionText}>Playlists</Text>
            <Ionicons name="ios-arrow-forward" color="#fefefe" style={styles.libraryOptionArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryOption} onPress={this.navToLibrary("artists")}>
            <Ionicons
              name="md-microphone"
              size={50}
              color="#fefefe"
              style={styles.libraryOptionIcon}
            />
            <Text style={styles.libraryOptionText}>Artists</Text>
            <Ionicons name="ios-arrow-forward" color="#fefefe" style={styles.libraryOptionArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryOption} onPress={this.navToLibrary("albums")}>
            <MaterialCommunityIcons
              name="album"
              size={50}
              color="#fefefe"
              style={styles.libraryOptionIcon}
            />
            <Text style={styles.libraryOptionText}>Albums</Text>
            <Ionicons
              name="ios-arrow-forward"
              size={45}
              Color="#fefefe"
              style={styles.libraryOptionArrow}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryOption} onPress={this.navToLibrary("tracks")}>
            <Ionicons
              name="ios-musical-notes"
              size={60}
              color="#fefefe"
              style={styles.libraryOptionIcon}
            />
            <Text style={styles.libraryOptionText}>Songs</Text>
            <Ionicons name="ios-arrow-forward" color="#fefefe" style={styles.libraryOptionArrow} />
          </TouchableOpacity>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Played</Text>
              {recentlyPlayed.length > 3 &&
                <TouchableOpacity
                  style={styles.viewAllButton}
                  onPress={this.navToLibrary("recent")}
                >
                  <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                </TouchableOpacity>
              }
              {recentlyPlayed.length <= 3 &&
                <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                  <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                </TouchableOpacity>
              }
            </View>
            {recentlyPlayed.length !== 0 &&
              <FlatList
                data={recentlyPlayed.slice(0, 3)}
                renderItem={this.renderTrack("user-recently")}
                keyExtractor={item => item}
              />
            }
            {(recentlyPlayed.length === 0 || !recentlyPlayed.length) &&
              <View>
                {fetchingRecent && <LoadingTrack type="cover" />}
                {(!fetchingRecent && trackError) &&
                  <Text style={styles.nothing}>Error loading tracks</Text>
                }
                {(!fetchingRecent && !trackError) &&
                  <View style={styles.empty}>
                    <Text style={styles.emptyTitle}>No songs played</Text>
                    <Text style={styles.emptySub}>Recently Played is your listening history</Text>
                  </View>
                }
              </View>
            }
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Playlists</Text>
              {topPlaylists.length > 3 &&
                <TouchableOpacity style={styles.viewAllButton} onPress={this.navToLibrary("top")}>
                  <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                </TouchableOpacity>
              }
              {topPlaylists.length <= 3 &&
                <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                  <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                </TouchableOpacity>
              }
            </View>
            {topPlaylists.length !== 0 &&
              <FlatList
                data={topPlaylists.slice(0, 3)}
                renderItem={this.renderPlaylist}
                keyExtractor={item => item}
              />
            }
            {(topPlaylists.length === 0 || !topPlaylists.length) &&
              <View>
                {fetchingTopPlaylists && <LoadingPlaylist />}
                {!fetchingTopPlaylists && <Text style={styles.nothing}>Nothing to show</Text>}
              </View>
            }
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Played</Text>
              {mostPlayed.length > 3 &&
                <TouchableOpacity style={styles.viewAllButton} onPress={this.navToLibrary("most")}>
                  <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                </TouchableOpacity>
              }
              {mostPlayed.length <= 3 &&
                <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                  <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                </TouchableOpacity>
              }
            </View>
            {mostPlayed.length !== 0 &&
              <FlatList
                data={mostPlayed.slice(0, 3)}
                renderItem={this.renderTrack("user-most")}
                keyExtractor={item => item}
              />
            }
            {(mostPlayed.length === 0 || !mostPlayed.length) &&
              <View>
                {fetchingMostPlayed && <LoadingTrack type="cover" />}
                {!fetchingMostPlayed && <Text style={styles.nothing}>Nothing to show</Text>}
              </View>
            }
          </View>
        </ScrollView>
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
        {(typeof selectedTrack === 'string' && tracksByID[selectedTrack]) &&
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

LibraryTabView.propTypes = {
  albums: PropTypes.object,
  artists: PropTypes.object,
  getMostPlayedTracks: PropTypes.func,
  createSession: PropTypes.func,
  getRecentTracks: PropTypes.func,
  leaveSession: PropTypes.func,
  player: PropTypes.object,
  playlists: PropTypes.object,
  queue: PropTypes.object,
  queueTrack: PropTypes.func,
  sessions: PropTypes.object,
  tracks: PropTypes.object,
  title: PropTypes.string,
  users: PropTypes.object
};

function mapStateToProps({albums, artists, player, playlists, queue, sessions, settings, tracks, users}) {
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
    getMostPlayedTracks,
    getRecentTracks,
    leaveSession,
    playTrack,
    queueTrack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryTabView);
