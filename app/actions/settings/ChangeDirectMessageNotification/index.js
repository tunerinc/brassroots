'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeDirectMessageNotification
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
 * Async function that changes the notiification setting for direct messages for the current user
 * 
 * @async
 * @function changeDirectMessageNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {boolean} status The new notification status for direct messages to update for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the direct message notification status updated
 * @rejects  {Error}          The error which caused the change direct message notification failure
 */
export function changeDirectMessageNotification(
  userID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeDirectMessageNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({directMessageNotification: status});
      dispatch(actions.changeDirectMessageNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changeDirectMessageNotificationFailure(err))
    }
  };
}
