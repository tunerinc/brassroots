'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionChatNotification
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the notification settings for live session chat messages for the current user
 * 
 * @async
 * @function changeSessionChatNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {string}  status The new notification status for live session chat messages to update for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the live session chat notification status updated
 * @rejects  {Error}          The error which caused the change live sessions chat notification failure
 */
export function changeSessionChatNotification(
  userID: string,
  status: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeSessionChatNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({sessionChatNotification: status});
      dispatch(actions.changeSessionChatNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changeSessionChatNotificationFailure(err));
    }
  };
}
