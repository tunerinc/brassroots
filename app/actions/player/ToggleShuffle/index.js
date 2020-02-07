'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleShuffle
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function which toggles shuffle on the tracks the current user is listening to
 * 
 * @async
 * @function toggleShuffle
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  sessionID The session id to toggle shuffle from
 * @param    {boolean} status    The new shuffle status for the current user
 *
 * @return   {Promise}
 * @resolves {object}            The tracks with the new shuffle status from the now playing session
 * @reject   {Error}             The error which caused the toggle shuffle failure
 */
export function toggleShuffle(
  sessionID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);

    try {
      await sessionRef.update({shuffle: !status});
      dispatch(actions.success(!status));
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
