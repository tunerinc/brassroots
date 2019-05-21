'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistJoinNotification
 */

import * as actions from './actions';
import {
  type Action,
  type State,
  type ThunkAction,
} from '../../../reducers/settings';
import {
  type Firebase,
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the notification setting for playlist joins for the current user
 * 
 * @async
 * @function changePlaylistJoinNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {boolean} status The new notification status for playlist joins for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the playlist join notification status updated
 * @rejects  {Error}          The error which caused the change playlist join notification failure
 */
export function changePlaylistJoinNotification(
  userID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changePlaylistJoinNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({playlistJoinNotification: status});
      dispatch(actions.changePlaylistJoinNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changePlaylistJoinNotificationFailure(err));
    }
  };
}
