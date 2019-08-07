'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopAlbums
 */

import Spotify from 'rn-spotify-sdk';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../AddArtists';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {
  type ThunkAction,
  type Artist,
} from '../../../reducers/artists';
import {type Album} from '../../../reducers/albums';
import {
  type FirestoreInstance,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

type Artists = {
  [id: string]: Artist,
};

type Albums = {
  [id: string]: Album,
};

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
    dispatch(actions.getArtistTopAlbumsRequest());

    const firestore: FirestoreInstance = getFirestore();
    const artistAlbumsRef: FirestoreDocs = firestore
      .collection('artists')
      .doc(artistID)
      .collection('albums');

    let artists: Artists = {};

    try {
      const artistAlbumDocs: FirestoreDocs = await artistAlbumsRef
        .orderBy('plays', 'desc')
        .limit(3)
        .get();
      
      if (artistAlbumDocs.empty) {
        dispatch(actions.getArtistTopAlbumsSuccess());
      } else {
        const albumIDs: Array<string> = artistAlbumDocs.docs.map(doc => doc.id);
        const albumsRes = await Spotify.getAlbums(albumIDs, {});
        const albums: Albums = albumsRes.albums.reduce((albumList, album) => {
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
                    image: '',
                    userTracks: [],
                    userAlbums: [],
                    tracks: [],
                    albums: [],
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

        dispatch(addAlbums(albums));
        dispatch(addArtists(artists));
        dispatch(actions.getArtistTopAlbumsSuccess());
      }
    } catch (err) {
      dispatch(actions.getArtistTopAlbumsFailure(err));
    }
  };
}