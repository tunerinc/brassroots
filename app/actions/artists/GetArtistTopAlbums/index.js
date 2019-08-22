'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopAlbums
 */

import Spotify from 'rn-spotify-sdk';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {
  type ThunkAction,
  type Artist,
} from '../../../reducers/artists';
import {type Album} from '../../../reducers/albums';
import {
  type FirestoreInstance,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function that gets an artist's top played albums from Ultrasound
 * 
 * @async
 * @function getArtistTopAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  artistID The Spotify artist id to get the top albums for
 * 
 * @returns  {Promise}
 * @resolves {object}           The top played albums for an artist
 * @rejects  {Error}            The error which caused the get artist top albums failure
 */
export function getArtistTopAlbums(
  artistID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const artistAlbumsRef: FirestoreDocs = firestore
      .collection('artists')
      .doc(artistID)
      .collection('albums');

    let artists = {};

    try {
      const artistAlbumDocs: FirestoreDocs = await artistAlbumsRef
        .orderBy('plays', 'desc')
        .limit(3)
        .get();
      
      if (artistAlbumDocs.empty) {
        dispatch(actions.success());
      } else {
        const topAlbums: Array<string> = artistAlbumDocs.docs.map(doc => doc.id);
        const albumsRes = await Spotify.getAlbums(topAlbums, {});
        const albums = albumsRes.albums.reduce((albumList, album) => {
          const large: string = album.images.length > 0 ? album.images[0].url : '';
          const medium: string = album.images.length > 0 ? album.images[1].url : large;
          const small: string = album.images.length > 0 ? album.images[2].url : large;

          return updateObject(albumList, {
            [album.id]: {
              small,
              medium,
              large,
              id: album.id,
              name: album.name,
              userTracks: [],
              tracks: [],
              artists: album.artists.map(artist => {
                artists = updateObject(artists, {
                  [artist.id]: {
                    id: artist.id,
                    name: artist.name,
                    small: '',
                    medium: '',
                    large: '',
                    userTracks: [],
                    userAlbums: [],
                    tracks: [],
                    albums: [],
                    topAlbums: artist.id === artistID ? topAlbums : [],
                  },
                });

                return {
                  id: artist.id,
                  name: artist.name,
                };
              }),
            },
          });
        });

        dispatch(addEntities({albums, artists}));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}