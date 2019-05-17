'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleMute
 */

import * as actions from './actions';
import type {Action, State} from '../../../reducers/player';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreDoc,
} from '../../../utils/firebaseTypes';

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

/**
 * Async function which toggles mute for the current user in the now playing session
 * 
 * @async
 * @function toggleMute
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  sessionID The Brassroots id of the session the current user is in
 * @param    {string}  userID    The Brassroots id of the current user
 * @param    {boolean} status    The mute status for the current user in the session
 *
 * @return   {Promise}
 * @resolves {object}            The now playing session with the new mute status for the current user
 * @reject   {Error}             The error which caused the toggle mute failure
 */
export function toggleMute(
  sessionID: string,
  userID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, { getFirestore }) => {
    dispatch(actions.toggleMuteRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(userID);

    try {
      await sessionUserRef.update({muted: !status});
      dispatch(actions.toggleMuteSuccess(!status));
    } catch (err) {
      dispatch(actions.toggleMuteFailure(err));
    }
  };
}
