'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementAlbumPlays
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/albums';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function which increments the amount of album plays
 * 
 * @async
 * @function incrementAlbumPlays
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  albumID The album id which to increment the amount of plays for
 * @param    {string}  userID  The user id to increment the album plays for
 *
 * @returns  {Promise}
 * @resolves {object}          The new amount of album plays
 * @rejects  {Error}           The error which caused the increment album plays failure
 */
export function incrementAlbumPlays(
  albumID: string,
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.incrementAlbumPlaysRequest());

    const firestore: FirestoreInstance = getFirestore();
    const userRef: FirestoreDoc = firestore.collection('users').doc(userID);
    const albumRef: FirestoreDoc = userRef.collection('albums').doc(albumID);

    try {
      const total: number = await firestore.runTransaction(async transaction => {
        const doc: FirestoreDoc = await transaction.get(albumRef);

        if (!doc.exists) {
          throw new Error('Unable to retrieve the album from Brassroots');
        }

        const {plays} = doc.data();

        transaction.update(albumRef, {plays: plays + 1});
        return plays + 1;
      });

      dispatch(actions.incrementAlbumPlaysSuccess());
    } catch (err) {
      dispatch(actions.incrementAlbumPlaysFailure(err));
    }
  };
}
