'use strict';

/**
 * @format
 * @flow
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
 * @module ChangeNewFollowerNotification
 */

/**
 * Async function that changes the notification setting for new followers for the current user
 * 
 * @async
 * @function changeNewFollowerNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {boolean} status The new notification status for new followers for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the new follower notification status updated
 * @rejects  {Error}          The error which caused the change new follower notification failure
 */
export function changeNewFollowerNotification(
  userID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeNewFollowerNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({newFollowerNotification: status});
      dispatch(actions.changeNewFollowerNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changeNewFollowerNotificationFailure(err));
    }
  };
}
