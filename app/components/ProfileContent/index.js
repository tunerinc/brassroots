'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import {onScroll} from 'react-native-redash';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import {HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_DELTA} from '../../containers/UserProfileView';
import styles from './styles';

// Components
import MusicSection from '../MusicSection';
import LoadingSession from '../LoadingSession';
import LoadingTrack from '../LoadingTrack';
import TrackCard from '../TrackCard';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

type Props = {|
  navToEditProfile: () => any,
  openModal: () => any,
  renderMostTrack: () => any,
  renderRecentTrack: () => any,
  renderTopPlaylist: () => any,
  viewMost: () => any,
  viewRecent: () => any,
  viewPlaylists: () => any,
  y: Animated.Value<number>,
  height: number,
  track: ?{
    id: string,
    name: string,
    artists: Array<{name: string}>,
    album: {
      name: string,
      small: string,
    },
  },
  user: {
    id: ?string,
    profileImage: ?string,
    coverImage: ?string,
    displayName: string,
    bio: ?string,
    location: ?string,
    website: ?string,
    currentSessionID: ?string,
    favoriteTrackID: ?string,
    mostPlayed: Array<string>,
    recentlyPlayed: Array<string>,
    topPlaylists: Array<string>,
  },
  currentUser: {
    id: string,
    following: Array<string>,
  },
  isCurrentUser: boolean,
  userFetching: Array<string>,
  sessionFetching: Array<string>,
  trackFetching: Array<string>,
  playlistFetching: Array<string>,
  userError: ?Error,
  trackError: ?Error,
  sessionError: ?Error,
  playlistError: ?Error,
  followerTotal: string | number,
  followingTotal: string | number,
  sessionIDs: Array<string>,
  trackIDs: Array<string>,
|};

type State = {||};

const {interpolate, Extrapolate} = Animated;

export default class ProfileContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  renderImage = () => <PlaceholderMedia isRound={true} style={styles.roundPhoto} />;

  render() {
    const {
      navToEditProfile,
      openModal,
      renderMostTrack,
      renderRecentTrack,
      renderTopPlaylist,
      viewMost,
      viewRecent,
      viewPlaylists,
      y,
      track,
      user,
      currentUser,
      isCurrentUser,
      userFetching,
      sessionFetching,
      trackFetching,
      playlistFetching,
      userError,
      trackError,
      sessionError,
      playlistError,
      followerTotal,
      followingTotal,
      sessionIDs,
      trackIDs,
      height: coverHeight,
    } = this.props;

    const opacity = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT / 2, 0, HEADER_MAX_HEIGHT / 2],
      outputRange: [0, 1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const userOpacity = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT * 0.3, 0, HEADER_MAX_HEIGHT * 0.1],
      outputRange: [0, 1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const infoOpacity = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT * 0.3, 0, HEADER_MAX_HEIGHT * 0.3],
      outputRange: [0, 1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const followOpacity = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT * 0.3, 0, HEADER_MAX_HEIGHT * 0.5],
      outputRange: [0, 1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <Animated.ScrollView
        onScroll={onScroll({y})}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        <View style={{height: coverHeight}}>
          <Animated.View style={[styles.gradient, {height: HEADER_DELTA}]}>
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
            <View style={[styles.profileHeader]}>
              <Animated.View style={[styles.user, {opacity: userOpacity}]}>
                <View style={styles.userPhoto}>
                  {typeof user.profileImage === 'string' &&
                    <FastImage style={styles.roundPhoto} source={{uri: user.profileImage}} />
                  }
                  {(userFetching.includes('users') && (!user.profileImage || user.profileImage === '')) &&
                    <Placeholder Animate={Fade} Left={this.renderImage} />
                  }
                </View>
                <View style={styles.userName}>
                  <Text numberOfLines={1} style={styles.userNameText}>
                    {user.displayName}
                  </Text>
                </View>
                {isCurrentUser &&
                  <TouchableOpacity
                    style={styles.userProfileAction}
                    onPress={navToEditProfile}
                  >
                    <Text style={styles.userProfileActionText}>edit profile</Text>
                  </TouchableOpacity>
                }
                {(!isCurrentUser && currentUser.following.includes(user.id)) &&
                  <TouchableOpacity style={styles.followingProfileAction} disabled>
                    <Ionicons name='md-person' color='#fefefe' style={styles.followPerson} />
                    <Ionicons name='md-checkmark' color='#fefefe' style={styles.followCheck} />
                  </TouchableOpacity>
                }
                {(!isCurrentUser && currentUser.following.includes(user.id)) &&
                  <TouchableOpacity style={styles.followProfileAction} disabled>
                    <Ionicons name='md-person' color='#fefefe' style={styles.followPerson} />
                    <MaterialCommunityIcons name='plus' color='#fefefe' style={styles.followPlus} />
                  </TouchableOpacity>
                }
              </Animated.View>
              <Animated.View style={[styles.bio, {opacity: infoOpacity}]}>
                <FontAwesome name='newspaper-o' color='#888' style={styles.bioIcon} />
                <View>
                  {(user && typeof user.bio === 'string' && user.bio !== '') &&
                    <Text style={styles.bioText}>
                      {user.bio}
                    </Text>
                  }
                  {(isCurrentUser && user && (typeof user.bio !== 'string' || user.bio === '')) &&
                    <TouchableOpacity style={styles.profileInfoButton} disabled>
                      <Text style={[styles.bioText, {color: '#2b6dc0'}]}>Add a bio</Text>
                    </TouchableOpacity>
                  }
                  {(
                    !isCurrentUser
                    && !userFetching.includes('users')
                    && !userError
                    && user
                    && user.bio === ''
                  ) &&
                    <Text style={[styles.bioText, styles.disabledText]}>No bio</Text>
                  }
                  {(
                    !isCurrentUser
                    && userFetching.includes('users')
                    && user
                    && (typeof user.bio !== 'string' || user.bio === '')
                  ) &&
                    <View style={styles.loadingInfo}>
                      <Placeholder Animate={Fade}>
                        <PlaceholderLine width={100} style={styles.loadingText} />
                      </Placeholder>
                    </View>
                  }
                </View>
              </Animated.View>
              <Animated.View style={[styles.location, {opacity: infoOpacity}]}>
                <Ionicons name='md-pin' color='#888' style={styles.locationIcon} />
                <View>
                  {(user && typeof user.location === 'string' && user.location !== '') &&
                    <Text style={styles.locationText}>
                      {user.location}
                    </Text>
                  }
                  {(isCurrentUser && user && (typeof user.location !== 'string' || user.location === '')) &&
                    <TouchableOpacity style={styles.profileInfoButton} disabled>
                      <Text style={[styles.locationText, {color: '#2b6dc0'}]}>Add a location</Text>
                    </TouchableOpacity>
                  }
                  {(
                    !isCurrentUser
                    && !userFetching.includes('users')
                    && !userError
                    && user
                    && user.location === ''
                  ) &&
                    <Text style={[styles.locationText, styles.disabledText]}>No location</Text>
                  }
                  {(
                    !isCurrentUser
                    && userFetching.includes('users')
                    && user
                    && (typeof user.location !== 'string' || user.location === '')
                  ) &&
                    <View style={styles.loadingInfo}>
                      <Placeholder Animate={Fade}>
                        <PlaceholderLine width={100} style={styles.loadingText} />
                      </Placeholder>
                    </View>
                  }
                </View>
              </Animated.View>
              <Animated.View style={[styles.website, {opacity: infoOpacity}]}>
                <Entypo name='link' color='#888' style={styles.websiteIcon} />
                <View>
                  {(user && typeof user.website === 'string' && user.website !== '') &&
                    <Text style={styles.websiteText}>
                      {user.website}
                    </Text>
                  }
                  {(isCurrentUser && user && (typeof user.website !== 'string' || user.website === '')) &&
                    <TouchableOpacity style={styles.profileInfoButton} disabled>
                      <Text style={[styles.websiteText, {color: '#2b6dc0'}]}>Add a website</Text>
                    </TouchableOpacity>
                  }
                  {(
                    !isCurrentUser
                    && !userFetching.includes('users')
                    && !userError
                    && user
                    && user.website === ''
                  ) &&
                    <Text style={[styles.websiteText, styles.disabledText]}>No website</Text>
                  }
                  {(
                    !isCurrentUser
                    && userFetching.includes('users')
                    && user
                    && (typeof user.website !== 'string' || user.website === '')
                  ) &&
                    <View style={styles.loadingInfo}>
                      <Placeholder Animate={Fade}>
                        <PlaceholderLine width={100} style={styles.loadingText} />
                      </Placeholder>
                    </View>
                  }
                </View>
              </Animated.View>
              {/* <Animated.View style={[styles.followCount, {opacity: followOpacity}]}>
                <TouchableOpacity style={styles.followers} disabled>
                  <Text>
                    <Text style={styles.followersCount}>
                      {followerTotal}
                    </Text>
                    <Text style={styles.followersText}> followers</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.following} disabled>
                  <Text>
                    <Text style={styles.followingCount}>
                      {followingTotal}
                    </Text>
                    <Text style={styles.followingText}> following</Text>
                  </Text>
                </TouchableOpacity>
              </Animated.View> */}
            </View>
          </Animated.View>
        </View>
        <View style={styles.scrollWrap}>
          <View style={styles.profileTrack}>
            <View>
              {sessionIDs.includes(user.currentSessionID) &&
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
              {!sessionIDs.includes(user.currentSessionID) &&
                <View style={styles.favoriteTrack}>
                  <View style={styles.favoriteTrackHeader}>
                    <Foundation name='star' style={styles.favoriteTrackIcon} />
                    <Text style={styles.favoriteTrackHeaderText}>Favorite Track</Text>
                  </View>
                  {trackFetching.includes('favorite') && <LoadingTrack type='cover' />}
                  {(!trackFetching.includes('favorite') && trackError) &&
                    <Text>Something went wrong.</Text>
                  }
                  {(trackIDs.includes(user.favoriteTrackID) && track && !trackError) &&
                    <TrackCard
                      key={track.id}
                      albumName={track.album.name}
                      artists={track.artists.map(a => a.name).join(', ')}
                      context={{
                        id: currentUser.id,
                        type: 'user-favorite',
                        username: user.displayName,
                        name: user.displayName,
                      }}
                      image={track.album.small}
                      name={track.name}
                      openModal={openModal}
                      showOptions={true}
                      showSquareImage={true}
                      type='cover'
                    />
                  }
                </View>
              }
            </View>
          </View>
          {/* {user &&
            <MusicSection
              renderItem={renderMostTrack}
              viewMore={viewMost}
              type='most'
              title='Most Played'
              items={user.mostPlayed}
              showError={typeof trackError === Error}
              fetching={trackFetching.includes('mostPlayed')}
            />
          }
          {user &&
            <MusicSection
              renderItem={renderTopPlaylist}
              viewMore={viewPlaylists}
              type='top'
              title='Top Playlists'
              items={user.topPlaylists}
              showError={typeof playlistError === Error}
              fetching={playlistFetching.includes('topPlaylists')}
            />
          }
          {user &&
            <MusicSection
              renderItem={renderRecentTrack}
              viewMore={viewRecent}
              type='recent'
              title='Recently Played'
              items={user.recentlyPlayed}
              showError={typeof trackError === Error}
              fetching={trackFetching.includes('recent')}
            />
          } */}
        </View>
      </Animated.ScrollView>
    );
  }
}