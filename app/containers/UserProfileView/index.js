'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import Modal from 'react-native-modal';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

// Components
import PlaylistCard from '../../components/PlaylistCard';
import LoadingPlaylist from '../../components/LoadingPlaylist';
import TrackCard from '../../components/TrackCard';
import LoadingTrack from '../../components/LoadingTrack';
import TrackModal from '../../components/TrackModal';
import MusicSection from '../../components/MusicSection';
import ImageCover from '../../components/ImageCover';
import ProfileContent from '../../components/ProfileContent';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

// Player Action Creators
import {playTrack} from '../../actions/player/PlayTrack';

// Queue Action Creators
import {queueTrack} from '../../actions/queue/QueueTrack';
import {toggleTrackLike} from '../../actions/queue/ToggleTrackLike';

// Sessions Action Creators
import {createSession} from '../../actions/sessions/CreateSession';
import {leaveSession} from '../../actions/sessions/LeaveSession';

// Tracks Action Creators
import {getFavoriteTrack} from '../../actions/tracks/GetFavoriteTrack';

const {Value, interpolate, Extrapolate} = Animated;
const {height} = Dimensions.get('window');
export const HEADER_MAX_HEIGHT = height * 0.6;
export const HEADER_MIN_HEIGHT = 65;
export const HEADER_DELTA = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrackMenuOpen: false,
      selectedTrack: null,
      y: new Value(0)
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
  }

  componentDidMount() {
    const {
      getFavoriteTrack,
      userToView,
      entities: {tracks, users},
      users: {currentUserID},
    } = this.props;

    const userID = typeof userToView === 'string' && userToView !== '' ? userToView : currentUserID;
    const {favoriteTrackID} = users.byID[userID];

    if (!tracks.allIDs.includes(favoriteTrackID)) {
      setTimeout(() => getFavoriteTrack(favoriteTrackID, userID), 100);
    }
  }

  openModal = selectedTrack => () => this.setState({selectedTrack, isTrackMenuOpen: true});

  closeModal = () => this.setState({isTrackMenuOpen: false})

  navToMostPlayed = (selectedUser, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libProMostPlayed({selectedUser});
        return;
      case 'Profile':
        Actions.proMostPlayed({selectedUser});
        return;
      default:
        return;
    }
  }

  navToTopPlaylists = (selectedUser, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libTopPlaylists({selectedUser});
        return;
      case 'Profile':
        Actions.proTopPlaylists({selectedUser});
        return;
      default:
        return;
    }
  }

  navToRecentlyPlayed = (selectedUser, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libProRecentlyPlayed({selectedUser});
        return;
      case 'Profile':
        Actions.proRecentlyPlayed({selectedUser});
        return;
      default:
        return;
    }
  }

  navToSettings = title => () => {
    switch (title) {
      case 'Library':
        Actions.libProSettings();
        return;
      case 'Profile':
        Actions.proSettings();
        return;
      default:
        return;
    }
  }

  navToEditProfile = title => () => {
    switch (title) {
      case 'Library':
        Actions.libProEditProfile();
        return;
      case 'Profile':
        Actions.proEditProfile();
        return;
      default:
        return;
    }
  }

  renderPlaylist({item}) {
    const {
      entities: {playlists, users},
      users: {currentUserID},
    } = this.props;
    const {image, name, members, mode, ownerID, ownerType} = playlists.byID[item];
    const ownerName = ownerID === 'spotify'
      ? 'Spotify'
      : ownerID !== currentUserID
      ? users.byID[ownerID].displayName
      : null;

    return (
      <PlaylistCard
        key={item}
        image={image}
        isMember={members.indexOf(currentUserID) !== -1}
        name={name}
        navToPlaylist={this.navToPlaylist(title.toLowerCase(), item)}
        mode={mode}
        ownerName={ownerName}
      />
    );
  }
  
  renderTrack = type => ({item, index}) => {
    const {
      selectedUser,
      entities: {tracks, users},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {displayName} = users.byID[userID];
    const {name, album, artists} = tracks.byID[item];

    return (
      <TrackCard
        key={item}
        type='cover'
        context={{type, displayName, id: userID, name: displayName}}
        openModal={this.openModal}
        name={name}
        artists={artists.map(a => a.name).join(', ')}
        showSquareImage={true}
        showOptions={true}
        image={album.small}
        albumName={album.name}
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

  renderModalContent() {
    const {selectedTrack} = this.state;
    const {
      entities: {queueTracks, sessions, tracks, users},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (!selectedTrack || !tracks.allIDs.includes(selectedTrack)) return <View></View>;

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
        isFavorite={users.byID[currentUserID].favoriteTrackID === selectedTrack}
      />
    );
  }

  render() {
    const {isTrackMenuOpen, y} = this.state;
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
    const titleOpacity = interpolate(y, {
      inputRange: [HEADER_DELTA * 0.65, HEADER_DELTA],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    const titleOffset = interpolate(y, {
      inputRange: [HEADER_DELTA * 0.65, HEADER_DELTA],
      outputRange: [-20, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    const {
      title,
      userToView,
      entities: {sessions, tracks, users},
      navigation: {state: {routeName}},
      playlists: {fetching: playlistFetching, error: playlistError},
      sessions: {fetching: sessionFetching, error: sessionError},
      tracks: {fetching: trackFetching, error: trackError},
      users: {currentUserID, fetching: userFetching, error: userError},
    } = this.props;
    const userID = typeof userToView === 'string' && userToView !== '' ? userToView : currentUserID;
    const currentUser = users.byID[currentUserID];
    const user = users.byID[userID];
    const isCurrentUser = user.id === currentUserID;
    const session = sessions.byID[user.currentSessionID];
    const track = tracks.byID[user.favoriteTrackID];

    let followerTotal = 0;
    let followingTotal = 0;

    if (typeof user.totalFollowers === 'number' && typeof user.totalFollowing === 'number') {
      if (user.totalFollowers < 1000) {
        followerTotal = `${user.totalFollowers}`;
      } else if (user.totalFollowers < 1000000) {
        let modifiedCount = user.totalFollowers / 1000;
        followerTotal = `${modifiedCount.toFixed(0)}K`;
      } else if (user.totalFollowers < 1000000000) {
        let modifiedCount = user.totalFollowers / 1000000;
        followerTotal = `${modifiedCount.toFixed(0)}M`;
      } else if (user.totalFollowers < 1000000000000) {
        let modifiedCount = user.totalFollowers / 1000000000;
        followerTotal = `${modifiedCount.toFixed(0)}B`;
      }

      if (user.totalFollowing < 1000) {
        followingTotal = `${user.totalFollowing}`;
      } else if (user.totalFollowing < 1000000) {
        let modifiedCount = user.totalFollowing / 1000;
        followingTotal = `${modifiedCount.toFixed(0)}K`;
      } else if (user.totalFollowing < 1000000000) {
        let modifiedCount = user.totalFollowing / 1000000;
        followingTotal = `${modifiedCount.toFixed(0)}M`;
      } else if (user.totalFollowing < 1000000000000) {
        let modifiedCount = user.totalFollowing / 1000000000;
        followingTotal = `${modifiedCount.toFixed(0)}B`;
      }
    }

    return (
      <View style={styles.container}>
        <ImageCover {...{y, image: user.coverImage, height: HEADER_MAX_HEIGHT}} />
        <ProfileContent
          navToEditProfile={this.navToEditProfile(title)}
          openModal={track ? this.openModal(track.id) : console.log('open')}
          renderMostTrack={this.renderTrack('user-most')}
          renderRecentTrack={this.renderTrack('user-recently')}
          renderTopPlaylist={this.renderPlaylist}
          viewMost={this.navToMostPlayed(user.id, title)}
          viewRecent={this.navToRecentlyPlayed(user.id, title)}
          viewPlaylists={this.navToTopPlaylists(user.id, title)}
          y={y}
          height={HEADER_MAX_HEIGHT}
          track={track ? track : null}
          user={user}
          currentUser={currentUser}
          isCurrentUser={isCurrentUser}
          userFetching={userFetching}
          sessionFetching={sessionFetching}
          trackFetching={trackFetching}
          playlistFetching={playlistFetching}
          userError={userError}
          sessionError={sessionError}
          trackError={trackError}
          playlistError={playlistError}
          followerTotal={followerTotal}
          followingTotal={followingTotal}
          sessionIDs={sessions.allIDs}
          trackIDs={tracks.allIDs}
        />
        <Animated.View style={[styles.header, {shadowOpacity}]}>
          <View style={styles.background}>
            <View style={styles.wrap}>
              {typeof user.coverImage === 'string' &&
                <Animated.Image
                  style={[styles.image, {opacity: imageOpacity}]}
                  blurRadius={60}
                  source={{uri: user.coverImage}}
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
            {(isCurrentUser && title === 'Profile' && routeName === 'proMain') &&
              <View style={styles.leftIcon}></View>
            }
            {(!isCurrentUser || title !== 'Profile' || routeName !== 'proMain') &&
              <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            }
            <Animated.Text style={[styles.title, {opacity: titleOpacity, bottom: titleOffset}]}>
              {user.displayName}
            </Animated.Text>
            {!isCurrentUser && <SimpleLineIcons name='options' style={styles.rightIcon} />}
            {isCurrentUser &&
              <Ionicons
                name='md-settings'
                style={styles.rightIcon}
                onPress={this.navToSettings(title)}
              />
            }
          </View>
        </Animated.View>
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
      </View>
    );
  }
}

UserProfileView.propTypes = {
  entities: PropTypes.object.isRequired,
  createSession: PropTypes.func.isRequired,
  getFavoriteTrack: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  playTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  queueTrack: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  toggleTrackLike: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
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
    getFavoriteTrack,
    leaveSession,
    playTrack,
    queueTrack,
    toggleTrackLike,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView);