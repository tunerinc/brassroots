'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopPlaylists
 */

import getPlaylist from '../../../utils/spotifyAPI/getPlaylist';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/artists';
import {
  type FirestoreInstance,
  type FirestoreDocs,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the top playlists in which the given artist is played
 * 
 * @async
 * @function getArtistTopPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  artistID The Spotify artist id to fetch the top playlists for
 * 
 * @returns  {Promise}
 * @resolves {object}           The top playlists in which the given artist is played
 * @rejects  {Error}            The error which caused the get artist top playlists failure
 */
export function getArtistTopPlaylists(
  artistID: string,
): ThunkAction {
  const options: {
    fields: string,
    market: string,
  } = {
    fields: 'id,name,images',
    market: 'US',
  };

  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const artistPlaylistsRef: FirestoreDocs = firestore.collection('artists').doc(artistID).collection('playlists');
    const usersRef: FirestoreRef = firestore.collection('users');
    
    let playlists = {};
    let users = {};

    try {
      const playlistDocs: FirestoreDocs = await artistPlaylistsRef.orderBy('plays', 'desc').limit(3).get();

      if (playlistDocs.empty) {
        dispatch(actions.success());
      } else {
        const topPlaylists: Array<string> = playlistDocs.docs.map(doc => doc.id);
        const playlistsRes = await Promise.all(
          topPlaylists.map((playlistID, index) => {
            return getPlaylist(playlistID, options);
          })
        );

        playlistsRes.forEach((playlist, index) => {
          const large: string = playlist.images.length > 0 ? playlist.images[0].url : '';
          const medium: string = playlist.images.length > 0 ? playlist.images[1].url : large;
          const small: string = playlist.images.length > 0 ? playlist.images[2].url : large;
          const {owner} = playlistDocs.docs[index].data();

          playlists = updateObject(playlists, {
            [playlist.id]: {
              small,
              medium,
              large,
              id: playlist.id,
              ownerID: owner.id,
              ownerType: owner.type,
              name: playlist.name,
            },
          });

          if (owner.type === 'user') {
            users = updateObject(users, {[owner.id]: {id: owner.id}});
          }
        });

        if (Object.keys(users).length > 0) {
          const fullUsers = await Promise.all(
            Object.keys(users).map(userID => usersRef.doc(userID).get())
          );

          fullUsers.forEach(user => {
            if (user.exists) {
              const {id, username, profileImage} = user.data();
              users = updateObject(users, {id, username, profileImage});
            } else {
              throw new Error('Unable to retrieve user from Ultrasound');
            }
          });
        }

        dispatch(addEntities({playlists, users, artists: {[artistID]: {topPlaylists, id: artistID}}}));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}