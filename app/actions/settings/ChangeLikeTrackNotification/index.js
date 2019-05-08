'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeLikeTrackNotification
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
 * Async function that changes the notification setting for liked tracks for the current user
 * 
 * @async
 * @function changeLikeTrackNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {boolean} status The new notification status for liked tracks for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the like track notification status updated
 * @rejects  {Error}          The error which caused the change like track notification failure
 */
export function changeLikeTrackNotification(
  userID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeLikeTrackNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({likedTrackNotification: status});
      dispatch(actions.changeLikeTrackNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changeLikeTrackNotificationFailure(err));
    }
  };
}