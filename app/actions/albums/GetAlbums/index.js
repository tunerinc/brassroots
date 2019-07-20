'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbums
 */

import getMySavedAlbums from "../../../utils/spotifyAPI/getMySavedAlbums";
import updateObject from '../../../utils/updateObject';
import {addAlbums} from '../AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import * as actions from './actions';
import {
  lastUpdated,
  type ThunkAction,
  type Album,
  type Artist,
} from '../../../reducers/albums';
import {
  type Paging,
  type SavedAlbum,
  type FullAlbum,
  type SimpleAlbum,
} from '../../../utils/spotifyAPI/types';

type AlbumsFromSpotify = Array<SavedAlbum | FullAlbum | SimpleAlbum>;
type Albums = {+[id: string]: Album};
type Artists = {+[id: string]: Artist};
type Tracks = {
  +[id: string]: {
    id: string,
    name: string,
    albumID: string,
    artists: Array<
      {
        id: string,
        name: string,
      }
    >,
    trackNumber: number,
    durationMS: number,
  },
};


/**
 * Async function that fetches the user's albums from Spotify
 * 
 * @async
 * @function getAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {boolean} [refreshing=false] Whether the current user is refreshing their saved albums
 * @param    {number}  [existingAlbums=0] The current number of existing albums that have been retrieved
 *
 * @returns  {Promise}
 * @resolves {object}                     The current user's library synced with Spotify
 * @rejects  {Error}                      The error which caused the sync spotify library failure
 */

export function getAlbums(
  refreshing: boolean = false,
  existingAlbums: number = 0,
): ThunkAction {
  const limit: number = 50;
  const offset: number = existingAlbums;
  const market: string = 'US';

  return async dispatch => {
    dispatch(actions.getAlbumsRequest(refreshing));

    try {
      const {items, total} = await getMySavedAlbums({limit, offset, market});
      const albumsFromSpotify = items.map(item => item.album);

      let artists: Artists = {};
      let tracks: Tracks = {};

      const albums: Albums = albumsFromSpotify.reduce((albumList, album) => {
        const hasImages: boolean = Array.isArray(album.images) && album.images && album.images.length === 3;

        const albumArtists: Artists = album.artists.reduce((artistList, artist) => {
          return updateObject(artistList, {
            [artist.id]: {
              id: artist.id,
              name: artist.name,
              small: '',
              medium: '',
              large: '',
            },
          });
        }, {});

        artists = updateObject(artists, albumArtists);

        const albumTracks: Tracks = album.tracks.items.reduce((trackList, track) => {
          const trackArtists: Artists = track.artists.reduce((artistList, artist) => {
            return updateObject(artistList, {
              [artist.id]: {
                id: artist.id,
                name: artist.name,
                small: '',
                medium: '',
                large: '',
              },
            });
          }, {});

          artists = updateObject(artists, trackArtists);

          return updateObject(trackList, {
            [track.id]: {
              id: track.id,
              name: track.name,
              albumID: album.id,
              artists: track.artists.map(a => ({id: a.id, name: a.name})),
              trackNumber: track.track_number,
              durationMS: track.duration_ms,
            },
          });
        }, {});

        tracks = updateObject(tracks, albumTracks);

        return updateObject(albumList, {
          [album.id]: {
            id: album.id,
            name: album.name,
            small: hasImages ? album.images[2].url : '',
            medium: hasImages ? album.images[1].url : '',
            large: hasImages ? album.images[0].url : '',
            userTracks: album.tracks.items.map(t => t.id),
            artists: album.artists.map(a => ({id: a.id, name: a.name})),
          },
        });
      }, {});

      dispatch(addArtists(artists));
      dispatch(addAlbums(albums));
      dispatch(addTracks(tracks));
      dispatch(actions.getAlbumsSuccess(albumsFromSpotify.map(a => a.id), total));
    } catch (err) {
      dispatch(actions.getAlbumsFailure(err));
    }
  };
}
