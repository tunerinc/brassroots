'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Components
import LoadingTrack from '../../components/LoadingTrack';
import LoadingAlbum from '../../components/LoadingAlbum';
import LoadingUser from '../../components/LoadingUser';
import TrackCard from '../../components/TrackCard';
import AlbumCard from '../../components/AlbumCard';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

// Artists Action Creators
import {getArtistTopAlbums} from '../../actions/artists/GetArtistTopAlbums';
import {getArtistTopListeners} from '../../actions/artists/GetArtistTopListeners';
import {getArtistTopPlaylists} from '../../actions/artists/GetArtistTopPlaylists';
import {getArtistTopTracks} from '../../actions/artists/GetArtistTopTracks';

class ArtistDetailsView extends React.Component {
  constructor(props) {
    super(props);

    this.renderTopListener = this.renderTopListener.bind(this);
    this.renderTopTrack = this.renderTopTrack.bind(this);
    this.renderTopAlbum = this.renderTopAlbum.bind(this);
  }

  componentDidMount() {
    const {
      artistToView,
      getArtistTopListeners,
      getArtistTopPlaylists,
      getArtistTopTracks,
      artists: {artistsByID},
    } = this.props;
    const {topListeners, topPlaylists, topTracks, topAlbums} = artistsByID[artistToView];

    if (topListeners.length === 0) {
      // getArtistTopListeners(artistToView);
    }

    if (topPlaylists.length === 0) {
      // getArtistTopPlaylists(artistToView);
    }

    if (topTracks.length === 0) {
      // getArtistTopTracks(artistToView);
    }

    if (topAlbums.length === 0) {
      // getArtistTopAlbums(artistToView);
    }
  }

  goToProfile = userToView => () => {
    Actions.libraryProfileMain({userToView});
  }

  renderTopListener({item, index}) {
    const {users: {usersByID}} = this.props;
    const user = usersByID[item];
    const styles = [styles.topListener, {marginLeft: index === 0 ? 20 : 0}];

    if (user) {
      return (
        <TouchableOpacity onPress={this.goToProfile(item)} style={styles}>
          <Image style={styles.topListenerImage} source={{uri: user.profileImage}} />
          <Text numberOfLines={1} style={styles.topListenerName}>
            {user.displayName}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  renderTopTrack({item, index}) {
    const {
      albums: {albumsByID},
      tracks: {tracksByID},
      usersByID: {currentUserID, usersByID},
    } = this.props;
    const {displayName} = usersByID[currentUserID];
    const {name, totalPlays, albumID, artists} = tracksByID[item];
    const {name: albumName} = albumsByID[albumID];

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
        albumName={albumName}
        artists={artists.map(a => a.name).join(', ')}
        context={{type, displayName, id: albumID, name: albumName}}
        name={name}
        trackCount={trackCount}
        trackIndex={index}
        type='album-top-track'
      />
    );
  }

  goToAlbum = (albumID) => () => {
    console.log(albumID);
  }

  renderTopAlbum({item, index}) {
    const {albums: {albumsByID}} = this.props;
    const {large, name, artists, totalPlays} = albumsByID[item];

    return (
      <AlbumCard
        key={item}
        albumImage={large}
        albumName={name}
        artists={artists.map(a => a.name).join(', ')}
        navToAlbum={this.goToAlbum}
        index={index}
        count={totalPlays}
      />
    );
  }

  render() {
    const {
      artistToView,
      artists: {artistsByID, fetchingListeners, fetchingAlbums, fetchingTracks, error: artistsError},
    } = this.props;
    const {
      userProfile,
      name,
      large,
      topListeners,
      topTracks,
      topAlbums,
      totalPlays,
    } = artistsByID[artistToView];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} keyboardDismissMode='interactive'>
          <View style={styles.scrollWrap}>
            <View style={styles.artistProfile}>
              <Text style={styles.sectionTitle}>PROFILE</Text>
              {userProfile &&
                <TouchableOpacity style={styles.artistUserProfile}>
                  <Image style={styles.artistUserProfileImage} source={{uri: large}} />
                  <Text style={styles.artistUserProfileName}>
                    {name}
                  </Text>
                  <Ionicons name='ios-arrow-forward' color='#fefefe' style={styles.arrowForward} />
                </TouchableOpacity>
              }
              {!userProfile &&
                <View style={styles.artistUserProfilePlaceholder}>
                  <View style={styles.default}>
                    <Image style={styles.defaultImage} source={require('../../images/logo.png')} />
                  </View>
                  <Text style={styles.artistUserProfileNamePlaceholder}>No user profile</Text>
                  <Ionicons name='ios-arrow-forward' color='#888' style={styles.arrowForward} />
                </View>
              }
            </View>
            <View style={styles.topListeners}>
              <Text style={styles.sectionTitle}>TOP LISTENERS</Text>
              {(!fetchingListeners && !artistsError && topListeners.length !== 0) &&
                <FlatList
                  data={topListeners}
                  renderItem={this.renderTopListener}
                  keyExtractor={item => item}
                  horizontal={true}
                />
              }
              {(fetchingListeners || artistsError || topListeners.length === 0) &&
                <View>
                  {(!fetchingListeners && artistsError) &&
                    <View style={styles.topListenersError}>
                      <Text style={styles.topListenersErrorText}>Unable to load top listeners</Text>
                    </View>
                  }
                  {(fetchingListeners && !artistsError) &&
                    <View style={styles.loadingSection}>
                      <LoadingUser />
                      <LoadingUser />
                      <LoadingUser />
                      <LoadingUser />
                    </View>
                  }
                </View>
              }
            </View>
            {totalPlays === 1 &&
              <Text style={styles.artistPlays}>
                <Text style={styles.artistPlaysNumber}>
                  {totalPlays}
                </Text> PLAY
              </Text>
            }
            {totalPlays !== 1 &&
              <Text style={styles.artistPlays}>
                <Text style={styles.artistPlaysNumber}>
                  {totalPlays}
                </Text> PLAYS
              </Text>
            }
            <View style={styles.topTracks}>
              <Text
                style={[
                  styles.sectionTitle,
                  {paddingBottom: 10},
                ]}
              >TOP TRACKS</Text>
              {(!fetchingTracks && !artistsError  && topTracks.length !== 0) &&
                <FlatList
                  data={topTracks}
                  renderItem={this.renderTopTrack}
                  keyExtractor={item => item}
                />
              }
              {(fetchingTracks || artistsError || topTracks.length === 0) &&
                <View>
                  {(!fetchingTracks && artistsError) &&
                    <View style={styles.topTracksError}>
                      <Text style={styles.topTracksErrorText}>Unable to load top tracks</Text>
                    </View>
                  }
                  {(fetchingTracks && !artistsError) &&
                    <View>
                      <LoadingTrack type='top' />
                    </View>
                  }
                </View>
              }
            </View>
            <View style={styles.topAlbums}>
              <Text
                style={[
                  styles.sectionTitle,
                  {paddingBottom: 10},
                ]}
              >TOP ALBUMS</Text>
              {(!fetchingAlbums && !artistsError  && topAlbums.length !== 0) &&
                <FlatList
                  data={topAlbums}
                  renderItem={this.renderTopAlbum}
                  keyExtractor={item => item}
                />
              }
              {(fetchingAlbums || artistsError || topAlbums.length === 0) &&
                <View>
                  {(!fetchingAlbums && artistsError) &&
                    <View style={styles.topAlbumsError}>
                      <Text style={styles.topAlbumsErrorText}>Unable to load top albums</Text>
                    </View>
                  }
                  {(fetchingAlbums && !artistsError) &&
                    <View>
                      <LoadingAlbum showIndex={true} />
                    </View>
                  }
                </View>
              }
            </View>
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

ArtistDetailsView.propTypes = {
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  artistToView: PropTypes.string.isRequired,
  getArtistTopAlbums: PropTypes.func.isRequired,
  getArtistTopListeners: PropTypes.func.isRequired,
  getArtistTopPlaylists: PropTypes.func.isRequired,
  getArtistTopTracks: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, tracks, users}) {
  return {
    albums,
    artists,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArtistTopAlbums,
    getArtistTopListeners,
    getArtistTopPlaylists,
    getArtistTopTracks,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailsView);