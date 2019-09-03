'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementTrackPlays
 */

import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/tracks';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function which increments the amount of track plays
 * 
 * @async
 * @function incrementTrackPlays
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  trackID The track id which to increment the amount of plays for
 * @param    {string}  userID  The user id to increment the track plays for
 *
 * @returns  {Promise}
 * @resolves {object}          The new amount of track plays
 * @rejects  {Error}           The error which caused the increment track plays failure
 */
export function incrementTrackPlays(
  trackID: string,
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const userRef: FirestoreDoc = firestore.collection('users').doc(userID);
    const trackRef: FirestoreDoc = userRef.collection('tracks').doc(trackID);

    try {
      const userPlays: number = await firestore.runTransaction(async transaction => {
        const doc: FirestoreDoc = await transaction.get(trackRef);

        if (!doc.exists) {
          throw new Error('Unable to retrieve track from Brassroots');
        }

        const {plays} = doc.data();

        transaction.update(trackRef, {plays: plays + 1});

        return plays + 1;
      });

      dispatch(addEntities({tracks: {[trackID]: {id: trackID, userPlays}}}));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
