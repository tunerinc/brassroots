'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

// Components
import LoadingTrack from '../../components/LoadingTrack';
import LoadingUser from '../../components/LoadingUser';
import TrackCard from '../../components/TrackCard';
import ArtistCard from '../../components/ArtistCard';

// Albums Action Creators
import {getAlbumTopListeners} from '../../actions/albums/GetAlbumTopListeners';
import {getAlbumTopPlaylists} from '../../actions/albums/GetAlbumTopPlaylists';
import {getAlbumTopTracks} from '../../actions/albums/GetAlbumTopTracks';

// Artists Action Creators
import {getArtistImages} from '../../actions/artists/GetArtistImages';

class AlbumDetailsView extends React.Component {
  constructor(props) {
    super(props);

    this.renderArtist = this.renderArtist.bind(this);
    this.renderTopListener = this.renderTopListener.bind(this);
    this.renderTopTrack = this.renderTopTrack.bind(this);
  }

  componentDidMount() {
    const {
      albumToView,
      getArtistImages,
      getAlbumTopListeners,
      getAlbumTopPlaylists,
      getAlbumTopTracks,
      albums: {albumsByID},
      artists: {artistsByID},
    } = this.props;
    const {artists, topListeners, topPlaylists, topTracks} = albumsByID[albumToView];
    const artistsToFetch = artists
      .map(a => {
        const {small, medium, large} = artistsByID[a.id];
        const fetchSmall = typeof small !== 'string' || small === '';
        const fetchMedium = typeof medium !== 'string' || medium === '';
        const fetchLarge = typeof large !== 'string' || large === '';
        if (fetchSmall && fetchMedium && fetchLarge) return a.id;
      })
      .filter(id => typeof id === 'string');

    if (artistsToFetch.length !== 0) {
      getArtistImages(artistsToFetch);
    }

    if (topListeners.length === 0) {
      // getAlbumTopListeners(albumToView);
    }

    if (topPlaylists.length === 0) {
      // getAlbumTopPlaylists(albumToView);
    }

    if (topTracks.length === 0) {
      // getAlbumTopTracks(albumToView);
    }
  }

  renderArtist({item, index}) {
    const {artists: {artistsByID}} = this.props;
    const artist = artistsByID[item];
    const cardStyles = [styles.albumArtist, {marginLeft: index === 0 ? 20 : 0}];

    if (!artist) return <View></View>;

    return <View></View>;
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
    } = this.props;
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
        context={{type: 'album-most', id: albumID, name: albumName}}
        name={name}
        trackCount={trackCount}
        trackIndex={index}
        type='most'
      />
    );
  }

  render() {
    const {
      albumToView,
      albums: {albumsByID, fetchingListeners, fetchingTracks, error: albumsError},
      artists: {artistsByID, fetchingImages},
    } = this.props;
    const {artists, topListeners, topTracks, totalPlays, large, name} = albumsByID[albumToView];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} keyboardDismissMode='interactive'>
          <View style={styles.scrollWrap}>
            <View style={styles.albumArtists}>
              <Text style={styles.sectionTitle}>ARTISTS</Text>
              {artists.length > 1 &&
                <FlatList
                  data={artists}
                  renderItem={this.renderArtist}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              }
              {artists.length === 1 &&
                <ArtistCard
                  artistImage={artistsByID[artists[0].id].small}
                  artistName={artistsByID[artists[0].id].name}
                  navToArtist={() => console.log('artist pressed')}
                  fetchingImage={fetchingImages}
                />
              }
            </View>
            <View style={styles.topListeners}>
              <Text style={styles.sectionTitle}>TOP LISTENERS</Text>
              {!fetchingListeners && topListeners.length !== 0 &&
                <FlatList
                  data={topListeners}
                  renderItem={this.renderTopListener}
                  keyExtractor={item => item}
                  horizontal
                />
              }
              {fetchingListeners || topListeners.length === 0 || albumsError &&
                <View>
                  { !fetchingListeners && albumsError &&
                    <View style={styles.topListenersError}>
                      <Text style={styles.topListenersErrorText}>Unable to load top listeners</Text>
                    </View>
                  }
                  {fetchingListeners && !albumsError &&
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
              <Text style={styles.albumPlays}>
                <Text style={styles.albumPlaysNumber}>
                  {totalPlays}
                </Text>{' '}
                PLAY
              </Text>
            }
            {totalPlays !== 1 &&
              <Text style={styles.albumPlays}>
                <Text style={styles.albumPlaysNumber}>
                  {totalPlays}
                </Text>{' '}
                PLAYS
              </Text>
            }
            <View style={styles.topTracks}>
              <Text
                style={[
                  styles.sectionTitle,
                  {paddingBottom: 10},
                ]}
              >TOP TRACKS</Text>
              {!fetchingTracks && !albumsError && topTracks.length !== 0 &&
                <FlatList
                  data={topTracks}
                  renderItem={this.renderTopTrack}
                  keyExtractor={item => item}
                />
              }
              {fetchingTracks || albumsError || topTracks.length === 0 &&
                <View>
                  {!fetchingTracks && albumsError &&
                    <View style={styles.topTracksError}>
                      <Text style={styles.topTracksErrorText}>Unable to load top tracks</Text>
                    </View>
                  }
                  {fetchingTracks && !albumsError &&
                    <View>
                      <LoadingTrack type='top' />
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
            <View style={styles.headerFilter} />
          </View>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            <View style={styles.rightIcon} />
          </View>
        </View>
      </View>
    );
  }
}

AlbumDetailsView.propTypes = {
  albums: PropTypes.object.isRequired,
  albumToView: PropTypes.string.isRequired,
  artists: PropTypes.object.isRequired,
  getArtistImages: PropTypes.func.isRequired,
  getAlbumTopListeners: PropTypes.func.isRequired,
  getAlbumTopPlaylists: PropTypes.func.isRequired,
  getAlbumTopTracks: PropTypes.func.isRequired,
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
    getArtistImages,
    getAlbumTopListeners,
    getAlbumTopPlaylists,
    getAlbumTopTracks
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(AlbumDetailsView);