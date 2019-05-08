'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistChangeNotification
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
 * Async function that changes the notification setting for playlist changes the current user is apart of
 * 
 * @async
 * @function changePlaylistChangeNotification
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {boolean} status The new notification status for playlist changes for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's setting with the playlist change notification status updated
 * @rejects  {Error}          The error which caused the change playlist change notification failure
 */
export function changePlaylistChangeNotification(
  userID: string,
  status: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changePlaylistChangeNotificationRequest());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({playlistChangeNotification: status});
      dispatch(actions.changePlaylistChangeNotificationSuccess(status));
    } catch (err) {
      dispatch(actions.changePlaylistChangeNotificationFailure(err));
    }
  };
}
