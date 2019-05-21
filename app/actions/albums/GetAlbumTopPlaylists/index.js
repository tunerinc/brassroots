'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopPlaylists
 */

// import {addPlaylists} from '../../playlists/AddPlaylists';
// import {addPeople} from '../../users/AddPeople';
import getPlaylist from '../../../utils/spotifyAPI/getPlaylist';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/albums';
import {
  type FirestoreInstance,
  type FirestoreDocs,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

type Playlists = {
  [id: string]: {
    +id: string,
    +image: string,
    +ownerID: string,
    +ownerType: string,
    +name: string,
  },
};

type Users = {
  [id: string]: {
    +id: string,
    +username?: string,
    +profileImage?: string,
  },
};

/**
 * Async function that gets the top playlists in which the given album is played
 * 
 * @async
 * @function getAlbumTopPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  albumID The Spotify album id to fetch the top playlists for
 * 
 * @returns  {Promise}
 * @resolves {object}          The top playlists in which the given album is played
 * @rejects  {Error}           The error which caused the get album top playlists failure
 */
export function getAlbumTopPlaylists(
  albumID: string,
): ThunkAction {
  const options = {
    fields: 'id,name,images',
    market: 'US',
  };

  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.getAlbumTopPlaylistsRequest());

    const firestore: FirestoreInstance = getFirestore();
    const albumPlaylistsRef: FirestoreDocs = firestore.collection('albums').doc(albumID).collection('playlists');
    const usersRef: FirestoreRef = firestore.collection('users');
    
    let playlists: Playlists = {};
    let users: Users = {};

    try {
      const playlistDocs: FirestoreDocs = await albumPlaylistsRef.orderBy('plays', 'desc').limit(3).get();

      if (playlistDocs.empty) {
        dispatch(actions.getAlbumTopPlaylistsSuccess(albumID, []));
      } else {
        const playlistIDs: Array<string> = playlistDocs.docs.map(doc => doc.id);
        const playlistsRes = await Promise.all(
          playlistIDs.map((playlistID, index) => {
            const {owner: {spotifyUserID}} = playlistDocs.docs[index].data();
            return getPlaylist(playlistID, options);
          })
        );

        playlistsRes.forEach((playlist, index) => {
          const image: string = playlist.images.length !== 0 ? playlist.images[0].url : '';
          const {owner} = playlistDocs.docs[index].data();

          playlists = updateObject(playlists, {
            [playlist.id]: {
              image,
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
              users = updateObject(users, {[id]: {id, username, profileImage}});
            } else {
              throw new Error('Unable to retrieve user from Ultrasound');
            }
          });
        }

        // dispatch(addPlaylists(playlists));
        // dispatch(addPeople(users));
        dispatch(actions.getAlbumTopPlaylistsSuccess(albumID, playlistIDs));
      }
    } catch (err) {
      dispatch(actions.getAlbumTopPlaylistsFailure(err));
    }
  };
}