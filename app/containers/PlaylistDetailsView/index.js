'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {Text, View, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Placeholder, PlaceholderMedia, Fade} from 'rn-placeholder';
import styles from './styles';

// Components
import RoundPerson from '../../components/RoundPerson';
import TrackCard from '../../components/TrackCard';
import LoadingTrack from '../../components/LoadingTrack';
import LoadingMember from '../../components/LoadingMember';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Player Action Creators
import {playTrack} from '../../actions/player/PlayTrack';

// Playlists Action Creators
import {getPlaylistTopMembers} from '../../actions/playlists/GetPlaylistTopMembers';
import {getPlaylistTopTracks} from '../../actions/playlists/GetPlaylistTopTracks';

// Queue Action Creators
import {queueTrack} from '../../actions/queue/QueueTrack';

// Sessions Action Creators
import {createSession} from '../../actions/sessions/CreateSession';

// Users Action Creators
import {getUserImage} from '../../actions/users/GetUserImage';

class PlaylistDetailsView extends React.Component {
  constructor(props) {
    super(props);

    this.renderMember = this.renderMember.bind(this);
    this.renderTopTrack = this.renderTopTrack.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    const {
      getUserImage,
      playlistToView,
      entities: {playlists, users},
      users: {fetching},
    } = this.props;

    if (
      playlistToView
      && playlists.allIDs.includes(playlistToView)
      && !fetching.includes('images')
      && playlists.byID[playlistToView].ownerID !== 'spotify'
      && (
        !users.allIDs.includes(playlists.byID[playlistToView].ownerID)
        || typeof users.byID[playlists.byID[playlistToView].ownerID].profileImage !== 'string'
        || users.byID[playlists.byID[playlistToView].ownerID].profileImage === ''
      )
    ) {
      setTimeout(() => getUserImage(playlists.byID[playlistToView].ownerID), 100);
    }
  }

  navToProfile = title => () => {
    switch (title) {
      case 'Library':
        Actions.libProMain({userToView: item});
        return;
      case 'Profile':
        Actions.proUser({userToView: item});
        return;
      default:
        return;
    }
  }

  renderMember({item, index}) {
    const {
      playlistToView,
      title,
      entities: {playlists, users},
      playlists: {fetching},
    } = this.props;
    
    if (!users.allIDs.includes(item) || !playlistToView || !playlists.byID[playlistToView]) return (
      <View></View>
    );
    
    const playlist = playlists.byID[playlistToView];
    const user = users.byID[item];
    const filterText = (index !== 2 || playlist.members.length <= 3)
      ? ''
      : playlist.members.length - 3 > 100
      ? '100+'
      : `${playlist.members.length - 3}+`;

    return (
      <RoundPerson
        onPress={() => console.log(user)}
        marginLeft={index === 0 ? 20 : 0}
        loading={fetching.includes('topMembers')}
        image={user.profileImage}
        text={index === 2 && playlist.members.length > 3 ? 'view all' : user.displayName}
        showFilter={index === 2 && playlist.members.length > 3}
        filterText={filterText}
      />
    );
  }

  renderTopTrack({item, index}) {
    const {
      playlistToView,
      entities: {albums, playlists, playlistTracks, tracks, users},
    } = this.props;
    const {ownerID, name: playlistName} = playlists.byID[playlistToView];
    const {displayName} = users.byID[ownerID];
    const {totalPlays, userID} = playlistTracks.byID[`${playlistToView}-${item}`];
    const {displayName: trackOwner} = users.byID[userID];

    let trackCount;

    if (totalPlays < 1000) {
      trackCount = totalPlays;
    } else if (totalPlays < 1000000) {
      const modifiedCount = totalPlays / 1000;
      trackCount = `${modifiedCount.toFixed(0)}K`;
    } else if (totalPlays < 1000000000) {
      const modifiedCount = totalPlays / 1000000;
      trackCount = `${modifiedCount.toFixed(0)}M`;
    } else if (totalPlays < 1000000000000) {
      const modifiedCount = totalPlays / 1000000000;
      trackCount = `${modifiedCount.toFixed(0)}B`;
    }

    return (
      <TrackCard
        key={item}
        artists={artists.map(a => a.name).join(', ')}
        context={{displayName, type: 'playlist-most', id: playlistToView, name: playlistName}}
        name={name}
        trackCount={trackCount}
        trackIndex={index}
        showUser={true}
        displayName={trackOwner}
        type='playlist'
      />
    );
  }

  renderHeader() {
    const {
      playlistToView,
      entities: {playlists},
      users: {currentUserID},
    } = this.props;
    const {ownerID, members} = playlists.byID[playlistToView];

    return (
      <RoundPerson
        onPress={() => console.log('header pressed')}
        image={null}
        text={(members.includes(currentUserID) || ownerID === currentUserID) ? 'invite' : 'join'}
        showPlus={true}
      />
    );
  }

  renderImage = () => <PlaceholderMedia isRound={true} style={styles.playlistCreatorImage} />;

  render() {
    const {
      playlistToView,
      title,
      entities: {playlists, users},
      playlists: {fetching: playlistFetching, error: playlistError},
      users: {fetching: userFetching},
    } = this.props;
    const {
      ownerID,
      ownerType,
      members,
      topTracks,
      totalPlays,
      large,
      name,
    } = playlists.byID[playlistToView];
    const owner = users.byID[ownerID];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} keyboardDismissMode='interactive'>
          <View style={styles.scrollWrap}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CREATOR</Text>
              {ownerID === 'spotify' &&
                <TouchableOpacity style={styles.playlistCreatorSpotify} disabled={true}>
                  <MaterialCommunityIcons name='spotify' style={styles.playlistCreatorSpotifyImage} />
                  <Text style={[styles.playlistCreatorName, {color: '#888'}]}>Spotify</Text>
                  <Ionicons name='ios-arrow-forward' color='#888' style={styles.arrowForward} />
                </TouchableOpacity>
              }
              {ownerID !== 'spotify' &&
                <TouchableOpacity style={styles.playlistCreator} onPress={() => console.log(owner)}>
                  {(typeof owner.profileImage === 'string' && owner.profileImage !== '') &&
                    <FastImage style={styles.playlistCreatorImage} source={{uri: owner.profileImage}} />
                  }
                  {(
                    !userFetching.includes('images')
                    && (
                      typeof owner.profileImage !== 'string'
                      || owner.profileImage === ''
                    )
                  ) &&
                    <View style={styles.default}>
                      <FastImage style={styles.defaultImage} source={require('../../images/logo.png')} />
                    </View>
                  }
                  {(
                    userFetching.includes('images')
                    && (
                      typeof owner.profileImage !== 'string'
                      || owner.profileImage === ''
                    )
                  ) &&
                    <View style={styles.playlistCreatorImage}>
                      <Placeholder Animate={Fade} Left={this.renderImage} />
                    </View>
                  }
                  <Text style={styles.playlistCreatorName}>
                    {owner.displayName}
                  </Text>
                  <Ionicons
                    name='ios-arrow-forward'
                    size={45}
                    color='#fefefe'
                    style={styles.arrowForward}
                  />
                </TouchableOpacity>
              }
            </View>
            {ownerID  !== 'spotify' &&
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>MEMBERS</Text>
                {(!playlistFetching.includes('topMembers') && members.length !== 0) &&
                  <FlatList
                    data={members}
                    renderItem={this.renderMember}
                    keyExtractor={item => item}
                    getItem={(data, index) => data[index]}
                    getItemCount={data => data.length}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={this.renderHeader}
                  />
                }
                {(playlistFetching.includes('topMembers') || members.length === 0) &&
                  <View>
                    {(!playlistFetching.includes('topMembers') && playlistError) &&
                      <View style={styles.membersError}>
                        <Text style={styles.membersErrorText}>Unable to load members</Text>
                      </View>
                    }
                    {(
                      !playlistFetching.includes('topMembers')
                      && !playlistError
                      && members.length === 0
                    ) &&
                      <View style={styles.topTracksEmpty}>
                        <Text style={styles.topTracksEmptyText}>No members</Text>
                      </View>
                    }
                    {playlistFetching.includes('topMembers') &&
                      <View style={styles.loadingSection}>
                        <LoadingMember marginLeft={20} />
                        <LoadingMember />
                        <LoadingMember />
                        <LoadingMember />
                      </View>
                    }
                  </View>
                }
              </View>
            }
            {/* {totalPlays === 1 &&
              <Text style={styles.playlistPlays}>
                <Text style={styles.playlistPlaysNumber}>
                  {totalPlays}
                </Text> PLAY
              </Text>
            }
            {totalPlays !== 1 &&
              <Text style={styles.playlistPlays}>
                <Text style={styles.playlistPlaysNumber}>
                  {totalPlays}
                </Text> PLAYS
              </Text>
            }
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, {paddingBottom: 10}]}>TOP TRACKS</Text>
              {(!playlistFetching.includes('topTracks') && !playlistError && topTracks.length > 0) &&
                <FlatList
                  data={topTracks}
                  renderItem={this.renderTopTrack}
                  keyExtractor={item => item}
                  getItem={(data, index) => data[index]}
                  getItemCount={data => data.length}
                />
              }
              {(!playlistFetching.includes('topTracks') && playlistError) &&
                <View style={styles.topTracksError}>
                  <Text style={styles.topTracksErrorText}>Unable to load top tracks</Text>
                </View>
              }
              {(
                !playlistFetching.includes('topTracks')
                && !playlistError
                && topTracks.length === 0
              ) &&
                <View style={styles.topTracksEmpty}>
                  <Text style={styles.topTracksEmptyText}>No tracks</Text>
                </View>
              }
              {playlistFetching.includes('topTracks') && <LoadingTrack type='top' />}
            </View> */}
          </View>
        </ScrollView>
        <View style={styles.header}>
          <View style={styles.headerBackground}>
            <Image
              style={styles.headerBackground}
              source={{uri: large}}
              resizeMode='cover'
              blurRadius={80}
            />
            <View style={styles.headerFilter}></View>
          </View>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            <View style={styles.rightIcon}></View>
          </View>
        </View>
      </View>
    );
  }
}

PlaylistDetailsView.propTypes = {
  createSession: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  getPlaylistTopMembers: PropTypes.func.isRequired,
  getPlaylistTopTracks: PropTypes.func.isRequired,
  getUserImage: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
  playlistToView: PropTypes.string,
  playTrack: PropTypes.func.isRequired,
  queueTrack: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, playlists, sessions, users}) {
  return {
    entities,
    playlists,
    sessions,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    getPlaylistTopMembers,
    getPlaylistTopTracks,
    getUserImage,
    playTrack,
    queueTrack,
  },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetailsView);