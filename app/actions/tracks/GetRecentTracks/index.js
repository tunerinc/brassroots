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
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
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
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const userRef: FirestoreDoc = firestore.collection('users').doc(userID);
      const recentRef: FirestoreDocs = userRef.collection('recentlyPlayed');
      const recentTracks: FirestoreDocs = await recentRef.orderBy('timeAdded', 'desc').limit(25).get();

      let music = {recent: [], tracks: {}, albums: {}, artists: {}};

      if (recentTracks.empty || !Array.isArray(recentTracks)) {
        dispatch(actions.success());
      } else {
        const recentlyPlayed: Array<string> = recentTracks.map(t => t.data().trackID);
        const tracks = recentTracks.reduce((obj, doc) => {
          return updateObject(obj, {
            [doc.id]: {
              ...doc.data(),
              id: doc.data().trackID,
              trackID: null,
              timeAdded: null,
            },
          });
        }, {});
  
        music = addMusicItems(tracks, music);

        dispatch(addEntities({...music, users: {[userID]: {id: userID, recentlyPlayed}}}));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}