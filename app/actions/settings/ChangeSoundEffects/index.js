'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSoundEffects
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
 * Async function that changes the sound effects preference for the current user
 * 
 * @async
 * @function changeSoundEffects
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id to change the preferences for
 * @param    {boolean} status The new sound effects preference for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the new sound effects status
 * @rejects  {Error}          The error which caused the change sound effects failure
 */
export function changeSoundEffects(
  userID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeSoundEffectsRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({soundEffects: status});
      dispatch(actions.changeSoundEffectsSuccess(status));
    } catch (err) {
      dispatch(actions.changeSoundEffectsFailure(err));
    }
  };
}
