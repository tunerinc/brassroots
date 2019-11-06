'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import debounce from "lodash.debounce";

// Styles
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

// Components
import LoadingTrack from '../../components/LoadingTrack';
import LoadingUser from '../../components/LoadingUser';
import TrackCard from '../../components/TrackCard';
import ArtistCard from '../../components/ArtistCard';
import RoundPerson from '../../components/RoundPerson';

// Albums Action Creators
import {getAlbumTopListeners} from '../../actions/albums/GetAlbumTopListeners';
import {getAlbumTopPlaylists} from '../../actions/albums/GetAlbumTopPlaylists';
import {getAlbumTopTracks} from '../../actions/albums/GetAlbumTopTracks';

// Artists Action Creators
import {getArtistImages} from '../../actions/artists/GetArtistImages';

class AlbumDetailsView extends React.Component {
  constructor(props) {
    super(props);

    this.renderPerson = this.renderPerson.bind(this);
    this.renderTopTrack = this.renderTopTrack.bind(this);
  }

  componentDidMount() {
    const {
      albumToView,
      getArtistImages,
      getAlbumTopListeners,
      getAlbumTopPlaylists,
      getAlbumTopTracks,
      entities: {albums, artists},
    } = this.props;

    const album = albums.byID[albumToView];
    const artistsToFetch = album.artists
      .map(a => {
        const {small, medium, large} = artists.byID[a.id];
        const fetchSmall = typeof small !== 'string' || small === '';
        const fetchMedium = typeof medium !== 'string' || medium === '';
        const fetchLarge = typeof large !== 'string' || large === '';
        if (fetchSmall && fetchMedium && fetchLarge) return a.id;
      })
      .filter(id => typeof id === 'string');

    if (artistsToFetch.length !== 0) {
      setTimeout(() => getArtistImages(artistsToFetch), 100);
    }

    if (album.topListeners.length === 0) {
      // getAlbumTopListeners(albumToView);
    }

    if (album.topPlaylists.length === 0) {
      // getAlbumTopPlaylists(albumToView);
    }

    if (album.topTracks.length === 0) {
      // getAlbumTopTracks(albumToView);
    }
  }

  renderPerson = (type) => ({item, index}) => {
    const {
      artists: {fetching},
      entities: {artists, users},
    } = this.props;

    if (
      (type === 'artist' && !artists.allIDs.includes(item.id))
      || (type === 'user' && !users.allIDs.includes(item))
    ) return <View></View>;

    const image = type === 'artist'
      ? artists.byID[item.id].medium
      : type === 'user'
      ? users.byID[item].profileImage
      : '';

    const name = type === 'artist'
    ? artists.byID[item.id].name
    : type === 'user'
    ? users.byID[item].displayName
    : '';

    return (
      <RoundPerson
        onPress={() => console.log(`${type} pressed`)}
        marginLeft={index === 0 ? 20 : 0}
        loading={type === 'artist' ? fetching.includes('images') : false}
        image={image}
        text={name}
      />
    );
  }

  goToProfile = userToView => () => Actions.libProMain({userToView});

  renderTopTrack({item, index}) {
    const {entities: {tracks}} = this.props;
    const {name, totalPlays, album, artists} = tracks.byID[item];

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
        albumName={album.name}
        artists={artists.map(a => a.name).join(', ')}
        context={{type: 'album-most', id: album.id, name: album.name}}
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
      entities: {albums, artists},
      albums: {fetching: albumFetch, error: albumError},
      artists: {fetching: artistFetch},
    } = this.props;
    const album = albums.byID[albumToView];
    const fetchingListeners: boolean = albumFetch.includes('topListeners');
    const fetchingTracks: boolean = albumFetch.includes('topTracks');
    const fetchingImages: boolean = artistFetch.includes('images');

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} keyboardDismissMode='interactive'>
          <View style={styles.scrollWrap}>
            <View style={styles.albumArtists}>
              {album.artists.length > 1 && <Text style={styles.sectionTitle}>ARTISTS</Text>}
              {album.artists.length === 1 && <Text style={styles.sectionTitle}>ARTIST</Text>}
              {album.artists.length > 1 &&
                <FlatList
                  data={album.artists}
                  extraData={this.props}
                  renderItem={this.renderPerson('artist')}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              }
              {album.artists.length === 1 &&
                <ArtistCard
                  artistImage={artists.byID[album.artists[0].id].small}
                  artistName={artists.byID[album.artists[0].id].name}
                  navToArtist={() => console.log('artist pressed')}
                  fetchingImage={fetchingImages}
                />
              }
            </View>
            {/* <View style={styles.topListeners}>
              <Text style={styles.sectionTitle}>TOP LISTENERS</Text>
              {(!fetchingListeners && album.topListeners.length !== 0) &&
                <FlatList
                  data={album.topListeners}
                  renderItem={this.renderPerson('user')}
                  keyExtractor={item => item}
                  horizontal
                />
              }
              {(fetchingListeners || album.topListeners.length === 0 || albumError) &&
                <View>
                  {(!albumFetch.includes('topListeners') && albumError) &&
                    <View style={styles.topListenersError}>
                      <Text style={styles.topListenersErrorText}>Unable to load top listeners</Text>
                    </View>
                  }
                  {(fetchingListeners && !albumError) &&
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
            {album.totalPlays === 1 &&
              <Text style={styles.albumPlays}>
                <Text style={styles.albumPlaysNumber}>
                  {album.totalPlays}
                </Text>{' '}
                PLAY
              </Text>
            }
            {album.totalPlays !== 1 &&
              <Text style={styles.albumPlays}>
                <Text style={styles.albumPlaysNumber}>
                  {album.totalPlays}
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
              {(!fetchingTracks && !albumError && album.topTracks.length !== 0) &&
                <FlatList
                  data={album.topTracks}
                  renderItem={this.renderTopTrack}
                  keyExtractor={item => item}
                />
              }
              {(fetchingTracks || albumError || album.topTracks.length === 0) &&
                <View>
                  {(!fetchingTracks && albumError) &&
                    <View style={styles.topTracksError}>
                      <Text style={styles.topTracksErrorText}>Unable to load top tracks</Text>
                    </View>
                  }
                  {(fetchingTracks && !albumError) &&
                    <View>
                      <LoadingTrack type='top' />
                    </View>
                  }
                </View>
              }
            </View> */}
          </View>
        </ScrollView>
        <View style={styles.header}>
          <View style={styles.headerBackground}>
            <Image
              style={styles.headerBackground}
              source={{uri: album.large}}
              resizeMode='cover'
              blurRadius={80}
            />
            <View style={styles.headerFilter} />
          </View>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text numberOfLines={1} style={styles.title}>
              {album.name}
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
  entities: PropTypes.object.isRequired,
  getArtistImages: PropTypes.func.isRequired,
  getAlbumTopListeners: PropTypes.func.isRequired,
  getAlbumTopPlaylists: PropTypes.func.isRequired,
  getAlbumTopTracks: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, entities, tracks, users}) {
  return {
    albums,
    artists,
    entities,
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailsView);