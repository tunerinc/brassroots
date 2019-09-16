'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleRepeat
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function which toggles repeat on the tracks the current user is listening to
 * 
 * @async
 * @function toggleRepeat
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  sessionID The session id to repeat the tracks of for the current user
 * @param    {boolean} status    The new repeat status for the current user
 *
 * @return   {Promise}
 * @resolves {object}            The tracks with the new repeat status from the now playing session
 * @reject   {Error}             The error which caused the repeat tracks failure
 */
export function toggleRepeat(
  sessionID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);

    try {
      await sessionRef.update({repeat: !status});
      dispatch(actions.success(!status));
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
