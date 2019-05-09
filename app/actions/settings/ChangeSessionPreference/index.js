'use strict';

/**
 * @format
 * @flow
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
 * @module ChangeSessionPreference
 */

/**
 * Async function that changes the preference on live sessions for the current user
 * 
 * @async
 * @function changeSessionPreference
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {string}  status The new preference status for live sessions for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the session preference status updated
 * @rejects  {Error}          The error which caused the change session preference failure
 */
export function changeSessionPreference(
  userID: string,
  status: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeSessionPreferenceRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({sessionPreference: status});
      dispatch(actions.changeSessionPreferenceSuccess(status));
    } catch (err) {
      dispatch(actions.changeSessionPreferenceFailure(err));
    }
  };
}
