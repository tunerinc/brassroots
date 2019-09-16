'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserSettings
 */

import {updateSettings} from '../UpdateSettings';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the settings for the current user
 * 
 * @async
 * @function getUserSettings
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The Spotify id of the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings retrieved from Drizzle
 * @rejects  {Error}          The error which caused the get user settings failure
 */
export function getUserSettings(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      const settings: FirestoreDoc = await settingsRef.doc(userID).get();

      if (settings.exists) {
        dispatch(updateSettings(settings.data()));
        dispatch(actions.success());
      } else {
        throw new Error('Unable to retrieve user settings from Ultrasound');
      }
    } catch (err) {
      dispatch(actions.failure(err))
    }
  };
}
