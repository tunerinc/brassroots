'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionMode
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/sessions';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the now playing session's mode status
 * 
 * @async
 * @function changeSessionMode
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  sessionID The session is to change the mode of
 * @param    {string}  mode      The new mode status for the now playing session
 *
 * @returns  {Promise}
 * @resolves {object}            The now playing session with the changed mode status
 * @rejects  {Error}             The error which caused the change session mode failure
 */
export function changeSessionMode(
  sessionID: string,
  mode: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeSessionModeRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);

    try {
      await sessionRef.update({mode});
      dispatch(actions.changeSessionModeSuccess());
    } catch (err) {
      dispatch(actions.changeSessionModeFailure(err))
    }
  };
}
