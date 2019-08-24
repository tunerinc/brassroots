'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionPreference
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the preference on live sessions for the current user
 * 
 * @async
 * @function changeSessionPreference
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {string}  status The new preference status for live sessions for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the session preference status updated
 * @rejects  {Error}          The error which caused the change session preference failure
 */
export function changeSessionPreference(
  userID: string,
  status: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({sessionPreference: status});
      dispatch(actions.success(status));
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
