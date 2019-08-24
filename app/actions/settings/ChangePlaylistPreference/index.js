'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistPreference
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the preference on playlists for the current user
 * 
 * @async
 * @function changePlaylistPreference
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 * @param    {string}  status The new preference status for playlists for the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The current user's settings with the playlist preference status updated
 * @rejects  {Error}          The error which caused the change playlist preference failure
 */
export function changePlaylistPreference(
  userID: string,
  status: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      await settingsRef.doc(userID).update({playlistPreference: status});
      dispatch(actions.success(status));
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
