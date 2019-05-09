'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionsNotification
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
 * Async function that changes the notification setting for live sessions for the current user
 * 
 * @async
 * @function changeSessionsNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {string}  status The new notification status for live sessions
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the live sessions notification setting updated
 * @rejects  {Error}          The error which caused the change sessions notification failure
 */
export function changeSessionsNotification(
  userID: string,
  status: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeSessionsNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({sessionNotification: status});
      dispatch(actions.changeSessionsNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changeSessionsNotificationFailure(err));
    }
  };
}
