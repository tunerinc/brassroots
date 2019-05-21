'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeGroupDirectMessageNotification
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the notification settings for group direct messages for the current user
 * 
 * @async
 * @function changeGroupDirectMessageNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {string}  status The new notification status for group direct messages to update for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the group direct message notification status updated
 * @rejects  {Error}          The error which caused the change group direct message notification failure
 */
export function changeGroupDirectMessageNotification(
  userID: string,
  status: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeGroupDirectMessageNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({groupDirectMessageNotification: status});
      dispatch(actions.changeGroupDirectMessageNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changeGroupDirectMessageNotificationFailure(err));
    }
  };
}
