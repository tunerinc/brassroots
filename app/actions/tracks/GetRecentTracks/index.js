'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetRecentTracks
 */

import addMusicItems from '../../../utils/addMusicItems';
import updateObject from '../../../utils/updateObject';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../AddTracks';
// import {addUserRecentlyPlayed} from '../../users/AddUserRecentlyPlayed';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/tracks';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the current user's recently played tracks
 * 
 * @async
 * @function getRecentTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  userID The current user's id
 * 
 * @return   {Promise}
 * @resolves {array}          The current user's recently played tracks in reverse chronological order
 * @rejects  {Error}          The error which caused the get recent tracks failure
 */
export function getRecentTracks(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.getRecentTracksRequest());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const userRef: FirestoreDoc = firestore.collection('users').doc(userID);
      const recentRef: FirestoreDocs = userRef.collection('recentlyPlayed');

      let music = {
        recent: [],
        tracks: {},
        albums: {},
        artists: {},
      };

      const recentTracks: FirestoreDocs = await recentRef.orderBy('timeAdded', 'desc').limit(25).get();
      
      if (recentTracks.empty || !Array.isArray(recentTracks)) {
        dispatch(actions.getRecentTracksSuccess());
      } else {
        let tracks = {};

        recentTracks.forEach(trackDoc => {
          tracks = updateObject(tracks, {
            [trackDoc.id]: {
              ...trackDoc.data(),
              id: trackDoc.data().trackID,
              trackID: null,
              timeAdded: null,
            },
          });
        });
  
        music = addMusicItems(tracks, music);

        dispatch(addArtists(music.artists));
        dispatch(addAlbums(music.albums));
        dispatch(addTracks(music.tracks));
        // dispatch(addUserRecentlyPlayed(userID, recentTracks.map(t => t.data().trackID)));
        dispatch(actions.getRecentTracksSuccess());
      }
    } catch (err) {
      dispatch(actions.getRecentTracksFailure(err));
    }
  };
}