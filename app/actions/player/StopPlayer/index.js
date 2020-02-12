'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopPlayer
 */

import moment from 'moment';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function that stops playback because there is no music queued.
 * 
 * @async
 * @function stopPlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The session id to stop playback for
 * 
 * @return   {Promise}
 * @resolves {object}            Confirmation the session's playback was stopped
 * @rejects  {Error}
 */
export function stopPlayer(
  sessionID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const timeLastPlayed: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

    try {
      dispatch(actions.success())
      await sessionRef.update({timeLastPlayed, paused: true, progress: 0});
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}