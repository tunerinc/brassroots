'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeThemeColor
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the theme color of the app for the current user
 * 
 * @async
 * @function changeThemeColor
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id to change the theme color for
 * @param    {string}  theme  The new theme color to change the app to
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the new theme color changed
 * @rejects  {Error}          The error which caused the change theme color failure
 */
export function changeThemeColor(
  userID: string,
  theme: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({theme});
      dispatch(actions.success(theme));
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
