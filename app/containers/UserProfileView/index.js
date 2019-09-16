'use strict';

import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, ScrollView, Animated, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import Modal from 'react-native-modal';
import Placeholder from 'rn-placeholder';
import LinearGradient from 'react-native-linear-gradient';

// Components
import PlaylistCard from '../../components/PlaylistCard';
import LoadingPlaylist from '../../components/LoadingPlaylist';
import TrackCard from '../../components/TrackCard';
import LoadingTrack from '../../components/LoadingTrack';
import TrackModal from '../../components/TrackModal';

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

const screenHeight = Dimensions.get('window').height;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const HEADER_MAX_HEIGHT = screenHeight * 0.6;
const HEADER_MIN_HEIGHT = 85;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      bioLines: 1,
      isTrackMenuOpen: false,
      selectedTrack: null,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
  }

  openModal = selectedTrack => () => {
    this.setState({selectedTrack, isTrackMenuOpen: true});
  }

  closeModal() {
    this.setState({isTrackMenuOpen: false});
  }

  navToMostPlayed = (selectedUser, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libraryProfileMostPlayed({selectedUser});
        return;
      case 'Profile':
        Actions.profileMostPlayed({selectedUser});
        return;
      default:
        return;
    }
  }

  navToTopPlaylists = (selectedUser, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libraryTopPlaylists({selectedUser});
        return;
      case 'Profile':
        Actions.profileTopPlaylists({selectedUser});
        return;
      default:
        return;
    }
  }

  navToRecentlyPlayed = (selectedUser, title) => () => {
    switch (title) {
      case 'Library':
        Actions.libraryProfileRecentlyPlayed({selectedUser});
        return;
      case 'Profile':
        Actions.profileRecentlyPlayed({selectedUser});
        return;
      default:
        return;
    }
  }

  navToSettings = title => () => {
    switch (title) {
      case 'Library':
        Actions.libraryProfileSettings();
        return;
      case 'Profile':
        Actions.profileSettings();
        return;
      default:
        return;
    }
  }

  navToEditProfile = title => () => {
    switch (title) {
      case 'Library':
        Actions.libraryProfileEditProfile();
        return;
      case 'Profile':
        Actions.profileEditProfile();
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
      entities: {queueTracks, sessions, tracks},
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
      />
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT + (this.state.bioLines * 10), HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const headerShadowOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 0.9],
      extrapolate: 'clamp',
    });
    const profileHeaderHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT - 85, HEADER_MIN_HEIGHT - 85],
      extrapolate: 'clamp',
    });
    const coverImageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.65, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const titleOffset = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.65, HEADER_SCROLL_DISTANCE],
      outputRange: [-50, -50, 0],
      extrapolate: 'clamp',
    });
    const userOpacity = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.65, HEADER_SCROLL_DISTANCE * 0.8],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const userOffset = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.8, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 600],
      extrapolate: 'clamp',
    });
    const bioOpacity = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.3, HEADER_SCROLL_DISTANCE * 0.45],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const bioOffset = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.45, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 600],
      extrapolate: 'clamp',
    });
    const locationOpacity = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.2, HEADER_SCROLL_DISTANCE * 0.35],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const locationOffset = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.35, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 600],
      extrapolate: 'clamp',
    });
    const websiteOpacity = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.15, HEADER_SCROLL_DISTANCE * 0.25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const websiteOffset = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.25, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 600],
      extrapolate: 'clamp',
    });
    const followOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.05],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const followOffset = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE * 0.05, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 600],
      extrapolate: 'clamp',
    });

    const {scrollY, bioLines} = this.state;
    const {
      routeName,
      title,
      userToView,
      entities: {sessions, tracks, users},
      playlists: {fetching: playlistFetching, error: playlistError},
      sessions: {fetching: sessionFetching, error: sessionError},
      tracks: {fetching: trackFetching, error: trackError},
      users: {currentUserID, fetching: userFetching, error: userError},
    } = this.props;
    const userID = userToView || currentUserID;
    const currentUser = users.byID[currentUserID];
    const user = users.byID[userID];
    const session = sessions.byID[user.currentSessionID];
    const track = tracks.byID[user.favoriteTrackID];
    
    return (
      <View style={styles.container}>
        <AnimatedScrollView
          style={styles.scrollContainer}
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}])}
        >
          <View
            style={[
              styles.scrollWrap,
              {marginTop: HEADER_MAX_HEIGHT + ( bioLines * 10)},
            ]}
          >
            <View style={styles.profileTrack}>
              {user &&
                <View>
                  {session &&
                    <View style={styles.liveSession}>
                      {sessionFetching.includes('sessions') && <LoadingSession />}
                      {(!sessionFetching.includes('sessions') && sessionError) &&
                        <Text>Something went wrong</Text>
                      }
                      {(!sessionFetching.includes('sessions') && !sessionError) &&
                        <Text>We have stuff</Text>
                      }
                    </View>
                  }
                  {!session &&
                    <View style={styles.favoriteTrack}>
                      <View style={styles.favoriteTrackHeader}>
                        <Foundation name='star' style={styles.favoriteTrackIcon} />
                        <Text style={styles.favoriteTrackHeaderText}>Favorite Track</Text>
                      </View>
                      {trackFetching.includes('favorite') && <LoadingTrack type='cover' />}
                      {(!trackFetching.includes('favorite') && trackError) &&
                        <Text>Something went wrong.</Text>
                      }
                      {(track && !trackError) &&
                        <TrackCard
                          key={track}
                          albumName={track.album.name}
                          artists={track.artists.map(a => a.name).join(', ')}
                          context={{
                            id: currentUserID,
                            type: 'user-favorite',
                            username: user.displayName,
                            name: user.displayName,
                          }}
                          image={track.album.small}
                          name={track.name}
                          openModal={this.openModal(favoriteTrack.id)}
                          showOptions={true}
                          showSquareImage={true}
                          type='cover'
                        />
                      }
                    </View>
                  }
                </View>
              }
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Most Played</Text>
                {user.mostPlayed.length > 3 &&
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={this.navToMostPlayed(user.id, title)}
                  >
                    <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                  </TouchableOpacity>
                }
                {!user.mostPlayed.length || user.mostPlayed.length <= 3 &&
                  <TouchableOpacity style={styles.viewAllButton} disabled>
                    <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                  </TouchableOpacity>
                }
              </View>
              {(
                !user.mostPlayed.length
                || user.mostPlayed.length === 0
                || trackFetching.includes('mostPlayed')
              ) &&
                <View>
                  {(trackFetching.includes('mostPlayed') && !trackError) &&
                    <LoadingTrack type='cover' />
                  }
                  {(!trackFetching.includes('mostPlayed') && !trackError) &&
                    <Text>Nothing to show</Text>
                  }
                  {(!trackFetching.includes('mostPlayed') && trackError) &&
                    <Text>Something went wrong.</Text>
                  }
                </View>
              }
              {(user.mostPlayed.length !== 0 && !trackFetching.includes('mostPlayed')) &&
                <FlatList
                  data={user.mostPlayed.slice(0, 3)}
                  renderItem={this.renderTrack('user-most')}
                  keyExtractor={item => item}
                />
              }
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Playlists</Text>
                {user.topPlaylists.length > 3 &&
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={this.navToTopPlaylists(user.id, title)}
                  >
                    <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                  </TouchableOpacity>
                }
                {(!user.topPlaylists.length || user.topPlaylists.length <= 3) &&
                  <TouchableOpacity style={styles.viewAllButton} disabled>
                    <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                  </TouchableOpacity>
                }
              </View>
              {(
                !user.topPlaylists.length
                || user.topPlaylists.length === 0
                || playlistFetching.includes('topPlaylists')
              ) &&
                <View>
                  {(playlistFetching.includes('topPlaylists') && !playlistError)
                    && <LoadingPlaylist />
                  }
                  {(!playlistFetching.includes('topPlaylists') && !playlistError) &&
                    <Text style={styles.nothing}>Nothing to show</Text>
                  }
                  {(!playlistFetching.includes('topPlaylists') && playlistError) &&
                    <Text style={styles.nothing}>Something went wrong.</Text>
                  }
                </View>
              }
              {(user.topPlaylists.length !== 0 && !playlistFetching.includes('topPlaylists')) &&
                <FlatList
                  data={user.topPlaylists.slice(0, 3)}
                  renderItem={this.renderPlaylist}
                  keyExtractor={item => item}
                />
              }
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recently Played</Text>
                {user.recentlyPlayed.length > 3 &&
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={this.navToRecentlyPlayed(user.id, title)}
                  >
                    <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                  </TouchableOpacity>
                }
                {(!user.recentlyPlayed.length || user.recentlyPlayed.length <= 3) &&
                  <TouchableOpacity style={styles.viewAllButton} disabled>
                    <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                  </TouchableOpacity>
                }
              </View>
              {(
                !user.recentlyPlayed.length
                || user.recentlyPlayed.length === 0
                || trackFetching.includes('recent')
              ) &&
                <View>
                  {(trackFetching.includes('recent') && !trackError) &&
                    <LoadingTrack type='cover' />
                  }
                  {(!trackFetching.includes('recent') && !trackError) &&
                    <Text style={styles.nothing}>Nothing to show</Text>
                  }
                  {(!trackFetching.includes('recent') && trackError) &&
                    <Text style={styles.nothing}>Something went wrong.</Text>
                  }
                </View>
              }
              {(user.recentlyPlayed.length !== 0 && !trackFetching.includes('recent')) &&
                <FlatList
                  data={user.recentlyPlayed.slice(0, 3)}
                  renderItem={this.renderTrack('user-recently')}
                  keyExtractor={item => item}
                />
              }
            </View>
          </View>
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
        </AnimatedScrollView>
        <Animated.View
          style={[
            styles.animatedHeader,
            {height: headerHeight, shadowOpacity: headerShadowOpacity}
          ]}>
          {user.coverImage !== '' &&
            <View style={styles.coverImageWrap}>
              <Image style={styles.coverImage} source={{uri: user.coverImage}} resizeMode='cover' />
              <Animated.Image
                style={[styles.coverImage, {opacity: coverImageOpacity}]}
                source={{uri: user.coverImage}}
                resizeMode='cover'
                blurRadius={80}
              />
              <LinearGradient
                style={styles.linearGradient}
                locations={[0, 0.4, 0.65, 1.0]}
                colors={[
                  'rgba(27,27,30,0.4)',
                  'rgba(27,27,30,0.75)',
                  'rgba(27,27,30,0.9)',
                  'rgba(27,27,30,1)',
                ]}
              />
            </View>
          }
          <View style={styles.nav}>
            {(user.id === currentUserID && title === 'Profile' && routeName !== 'profileUser') &&
              <View style={styles.leftIcon}></View>
            }
            {(user.id !== currentUserID || title !== 'Profile' || routeName !== 'profileUser') &&
              <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            }
            <Animated.Text style={[styles.title, {opacity: titleOpacity, bottom: titleOffset}]}>
              {user.displayName}
            </Animated.Text>
            {user.id === currentUserID &&
              <Ionicons
                name='md-settings'
                style={styles.rightIcon}
                onPress={this.navToSettings(title)}
              />
            }
            {user.id !== currentUserID &&
              <SimpleLineIcons name='options' style={styles.rightIcon} />
            }
          </View>
          <Animated.View style={[styles.profileHeader, {height: profileHeaderHeight}]}>
            <Animated.View style={[styles.user, {opacity: userOpacity, bottom: userOffset}]}>
              <View style={styles.userPhoto}>
                {!userFetching.includes('users') &&
                  <View>
                    {(!user.profileImage || user.profileImage === '') &&
                      <Text>Nothing to show</Text>
                    }
                    {user.profileImage !== '' &&
                      <Image style={styles.roundPhoto} source={{uri: user.profileImage}} />
                    }
                  </View>
                }
                {userFetching.includes('users') &&
                  <View>
                    <Placeholder.Media animate='fade' size={70} hasRadius={true} color='#888' />
                  </View>
                }
              </View>
              <View style={styles.userName}>
                <Text numberOfLines={1} style={styles.userNameText}>
                  {user.displayName}
                </Text>
              </View>
              {user.id === currentUserID &&
                <TouchableOpacity
                  style={styles.userProfileAction}
                  onPress={this.navToEditProfile(title)}
                >
                  <Text style={styles.userProfileActionText}>edit profile</Text>
                </TouchableOpacity>
              }
              {(user.id !== currentUserID && currentUser.following.includes(user.id)) &&
                <TouchableOpacity style={styles.followingProfileAction} disabled>
                  <Ionicons name='md-person' color='#fefefe' style={styles.followPerson} />
                  <Ionicons name='md-checkmark' color='#fefefe' style={styles.followCheck} />
                </TouchableOpacity>
              }
              {(user.id !== currentUserID && currentUser.following.includes(user.id)) &&
                <TouchableOpacity style={styles.followProfileAction} disabled>
                  <Ionicons name='md-person' color='#fefefe' style={styles.followPerson} />
                  <MaterialCommunityIcons name='plus' color='#fefefe' style={styles.followPlus} />
                </TouchableOpacity>
              }
            </Animated.View>
            <Animated.View style={[styles.bio, {opacity: bioOpacity, bottom: bioOffset}]}>
              <FontAwesome name='newspaper-o' color='#888' style={styles.bioIcon} />
              <View>
                {user.bio !== '' &&
                  <Text
                    style={styles.bioText}
                    onLayout={e => {
                      this.setState({
                        bioLines: Math.ceil(e.nativeEvent.layout.height / 19.2).toFixed(0),
                      });
                    }}
                  >
                    {user.bio}
                  </Text>
                }
                {(user.id === currentUserID && (!user.bio || user.bio === '')) &&
                  <TouchableOpacity style={styles.profileInfoButton} disabled>
                    <Text style={[styles.bioText, {color: '#2b6dc0'}]}>Add a bio</Text>
                  </TouchableOpacity>
                }
                {(user.id !== currentUserID && !userFetching.includes('users') && !userError && user.bio === '') &&
                  <Text style={[styles.bioText, styles.disabledText]}>No bio</Text>
                }
                {(user.id !== currentUserID && userFetching.includes('users') && (!user.bio || user.bio === '')) &&
                  <View style={styles.loadingInfo}>
                    <Placeholder.Line
                      animate='fade'
                      textSize={16}
                      lineSpacing={3.2}
                      color='#888'
                      width='100%'
                    />
                  </View>
                }
              </View>
            </Animated.View>
            <Animated.View
              style={[
                styles.location,
                {opacity: locationOpacity, bottom: locationOffset},
              ]}
            >
              <Ionicons name='md-pin' color='#888' style={styles.locationIcon} />
              <View>
                {user.location !== '' &&
                  <Text numberOfLines={1} style={styles.locationText}>
                    {user.location}
                  </Text>
                }
                {(user.id === currentUserID && (!user.location || user.location === '')) &&
                  <TouchableOpacity style={styles.profileInfoButton} disabled>
                    <Text numberOfLines={1} style={[styles.locationText, {color: '#2b6dc0'}]}>
                      Add a location
                    </Text>
                  </TouchableOpacity>
                }
                {(
                  user.id !== currentUserID
                  && !userFetching.includes('users')
                  && !userError
                  && user.location === ''
                ) &&
                  <Text style={[styles.locationText, styles.disabledText]}>No location</Text>
                }
                {(
                  user.id !== currentUserID
                  && userFetching.includes('users')
                  && (!user.location || user.location === '')
                ) &&
                  <View style={styles.loadingInfo}>
                    <Placeholder.Line
                      animate='fade'
                      textSize={16}
                      lineSpacing={3.2}
                      color='#888'
                      width='100%'
                    />
                  </View>
                }
              </View>
            </Animated.View>
            <Animated.View
              style={[
                styles.website,
                {opacity: websiteOpacity, bottom: websiteOffset},
              ]}
            >
              <Entypo name='link' color='#888' style={styles.websiteIcon} />
              <View>
                {user.website !== '' &&
                  <Text numberOfLines={1} style={styles.websiteText}>
                    {user.website}
                  </Text>
                }
                {(user.id === currentUserID && (!user.website || user.website === '')) &&
                  <TouchableOpacity style={styles.profileInfoButton} disabled>
                    <Text style={[styles.websiteText, {color: '#2b6dc0'}]}>Add a website</Text>
                  </TouchableOpacity>
                }
                {(
                  user.id !== currentUserID
                  && !userFetching.includes('users')
                  && !userError
                  && user.website === ''
                ) &&
                  <Text style={[styles.websiteText, styles.disabledText]}>No website</Text>
                }
                {(
                  user.id !== currentUserID
                  && userFetching.includes('users')
                  && (!user.website || user.website === '')
                ) &&
                  <View style={styles.loadingInfo}>
                    <Placeholder.Line
                      animate='fade'
                      textSize={16}
                      lineSpacing={3.2}
                      color='#888'
                      width='100%'
                    />
                  </View>
                }
              </View>
            </Animated.View>
            <Animated.View
              style={[
                styles.followCount,
                {opacity: followOpacity, bottom: followOffset},
              ]}
            >
              <TouchableOpacity style={styles.followers} disabled>
                {user.totalFollowers &&
                  <Text style={styles.followersCount}>
                    {user.totalFollowers}
                  </Text>
                }
                {(!user.totalFollowers && !userFetching.includes('users') && userError) &&
                  <Text style={styles.followersCount}>-</Text>
                }
                {(!user.totalFollowers && userFetching.includes('users') && !userError) &&
                  <View style={styles.loadingFollow}>
                    <Placeholder.Line
                      animate='fade'
                      textSize={16}
                      lineSpacing={3.2}
                      color='#888'
                      width='100%'
                    />
                  </View>
                }
                <Text style={styles.followersText}>followers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.following} disabled>
                {user.totalFollowing &&
                  <Text style={styles.followingCount}>
                    {user.totalFollowing}
                  </Text>
                }
                {(!user.totalFollowing && !userFetching.includes('users') && userError) &&
                  <Text style={styles.followingCount}>-</Text>
                }
                {(!user.totalFollowing && userFetching.includes('users') && !userError) &&
                  <View style={styles.loadingFollowing}>
                    <Placeholder.Line
                      animate='fade'
                      textSize={16}
                      lineSpacing={3.2}
                      color='#888'
                      width='100%'
                    />
                  </View>
                }
                <Text style={styles.followingText}>following</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

UserProfileView.propTypes = {
  entities: PropTypes.object.isRequired,
  createSession: PropTypes.func.isRequired,
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
    leaveSession,
    playTrack,
    queueTrack,
    toggleTrackLike,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView);