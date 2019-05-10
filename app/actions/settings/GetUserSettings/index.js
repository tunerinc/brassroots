'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserSettings
 */

import {addSettings} from '../AddSettings';
import * as actions from './actions';
import type {Action, State} from '../../../reducers/settings';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreRef,
  FirestoreDoc,
} from '../../../utils/firebaseTypes';

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

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
    dispatch(actions.getUserSettingsRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      const settings: FirestoreDoc = await settingsRef.doc(userID).get();

      if (settings.exists) {
        dispatch(addSettings(settings.data()));
        dispatch(actions.getUserSettingsSuccess());
      } else {
        throw new Error('Unable to retrieve user settings from Ultrasound');
      };
    } catch (err) {
      dispatch(actions.getUserSettingsFailure(err))
    };
  };
};
