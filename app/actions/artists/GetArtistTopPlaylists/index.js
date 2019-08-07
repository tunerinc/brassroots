'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopPlaylists
 */

import {addPlaylists} from '../../playlists/AddPlaylists';
import {addPeople} from '../../users/AddPeople';
import getPlaylist from '../../../utils/spotifyAPI/getPlaylist';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/artists';
import {
  type FirestoreInstance,
  type FirestoreDocs,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

type Playlists = {
  [id: string]: {
    id: string,
    small: string,
    medium: string,
    large: string,
    name: string,
    ownerID: string,
    ownerType: string,
  },
};

type Users = {
  [id: string]: {
    id: string,
    username?: string,
    profileImage?: string,
  },
};

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
    dispatch(actions.getArtistTopPlaylistsRequest());

    const firestore: FirestoreInstance = getFirestore();
    const artistPlaylistsRef: FirestoreDocs = firestore.collection('artists').doc(artistID).collection('playlists');
    const usersRef: FirestoreRef = firestore.collection('users');
    
    let playlists: Playlists = {};
    let users: Users = {};

    try {
      const playlistDocs: FirestoreDocs = await artistPlaylistsRef.orderBy('plays', 'desc').limit(3).get();

      if (playlistDocs.empty) {
        dispatch(actions.getArtistTopPlaylistsSuccess());
      } else {
        const playlistIDs: Array<string> = playlistDocs.docs.map(doc => doc.id);
        const playlistsRes = await Promise.all(
          playlistIDs.map((playlistID, index) => {
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

        dispatch(addPlaylists(playlists));
        dispatch(addPeople(users));
        dispatch(actions.getArtistTopPlaylistsSuccess());
      }
    } catch (err) {
      dispatch(actions.getArtistTopPlaylistsFailure(err));
    }
  };
}