'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeNearbySessionNotification
 */

import * as actions from './actions';
import type {Action, State} from '../../../reducers/settings';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreRef,
} from '../../../utils/firebaseTypes';

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

/**
 * Async function that changes the notification settings for nearby sessions for the current user
 * 
 * @async
 * @function changeNearbySessionNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {string}  status The new notification status for nearby sessions for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the nearby session notification status updated
 * @rejects  {Error}          The error which caused the change nearby session notification failure
 */
export function changeNearbySessionNotification(
  userID: string,
  status: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeNearbySessionNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({nearbySessionNotification: status});
      dispatch(actions.changeNearbySessionNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changeNearbySessionNotificationFailure(err));
    }
  };
}
