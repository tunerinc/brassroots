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
import {
  initialState,
  type ThunkAction,
} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the settings for the current user
 * 
 * @async
 * @function getUserSettings
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID  The Spotify id of the current user
 *
 * @returns  {Promise}
 * @resolves {object}          The current user's settings retrieved from Drizzle
 * @rejects  {Error}           The error which caused the get user settings failure
 */
export function getUserSettings(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    let batch: FirestoreBatch = firestore.batch();

    try {
      const settings: FirestoreDoc = await settingsRef.doc(userID).get();
      const {version: appVersion} = initialState;

      if (settings.exists) {
        let version: string = settings.data().version;
        let versionsMatch: boolean = typeof appVersion === 'string' && appVersion === version;

        if (typeof appVersion === 'string' && !versionsMatch) {
          version = appVersion;
          batch.update(settingsRef.doc(userID), {version});
        }

        dispatch(updateSettings({...settings.data(), version}));
        dispatch(actions.success());
        if (!versionsMatch) await batch.commit();
      } else {
        throw new Error('Unable to retrieve user settings from Ultrasound');
      }
    } catch (err) {
      dispatch(actions.failure(err))
    }
  };
}
