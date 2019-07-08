'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SeekPosition
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
import {setProgress} from '../SetProgress';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

/**
 * Async function that seeks a session to a new position
 * 
 * @async
 * @function seekPosition
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The session id to seek to a new position
 * @param    {string}  userID    The Brassroots id of the current user
 * @param    {number}  seekTime  The new position to seek the session to
 * 
 * @return   {Promise}
 * @resolves {object}            Confirmation the session was successfully seeked to the new position
 * @rejects  {Error}             The error which caused the seek position failure
 */
export function seekPosition(
  sessionID: string,
  userID: string,
  seekTime: number,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.seekPositionRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(userID);
    const timeLastPlayed: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

    let batch: FirestoreBatch = firestore.batch();

    try {
      const seconds: number = parseInt(Math.abs(seekTime / 1000).toFixed(0));

      batch.update(sessionRef, {timeLastPlayed, progress: seekTime});
      batch.update(sessionUserRef, {progress: seekTime});

      const promises = [
        batch.commit(),
        Spotify.seek(seconds),
      ];

      await Promise.all(promises);
      dispatch(setProgress(seekTime));
      dispatch(actions.seekPositionSuccess());
    } catch (err) {
      dispatch(actions.seekPositionFailure(err));
    }
  };
}