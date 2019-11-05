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
import {updatePlayer} from '../UpdatePlayer';
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
 * @param    {number}  progress  The new position to seek the session to
 * 
 * @return   {Promise}
 * @resolves {object}            Confirmation the session was successfully seeked to the new position
 * @rejects  {Error}             The error which caused the seek position failure
 */
export function seekPosition(
  sessionID: string,
  userID: string,
  progress: number,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(userID);
    const timeLastPlayed: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

    let batch: FirestoreBatch = firestore.batch();

    try {
      const seconds: number = parseInt(Math.abs(progress / 1000).toFixed(0));

      await Spotify.seek(seconds);

      dispatch(updatePlayer({progress}));
      dispatch(actions.success());

      batch.update(sessionRef, {timeLastPlayed, progress});
      batch.update(sessionUserRef, {progress});

      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}