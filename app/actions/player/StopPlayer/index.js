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
import {
  type Action,
  type State,
  type ThunkAction,
} from '../../../reducers/player';
import {
  type Firebase,
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
    dispatch(actions.stopPlayerRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const timeLastPlayed: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

    try {
      await sessionRef.update({timeLastPlayed, paused: true, currentProgressMS: 0});
      dispatch(actions.stopPlayerSuccess())
    } catch (err) {
      dispatch(actions.stopPlayerFailure(err));
    }
  };
}