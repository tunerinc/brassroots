'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleTrackLike
 */

import moment from 'moment';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/queue';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function which toggles a like on a track in the now playing session's queue
 * 
 * @async
 * @function toggleTrackLike
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string}  sessionID The session id in which to toggle like on a track
 * @param  {string}  queueID   The queue id of the track to toggle like on
 * @param  {string}  userID    The Brassroots id of the current user
 * @param  {boolean} liked     Whether the current user likes the track
 *
 * @return {Promise}
 * @fulfil {object}            Confirmation the like successfully toggled on the track
 * @reject {Error}             The error which caused the toggle track like failure
 */
export function toggleTrackLike(
  sessionID: string,
  queueID: string,
  userID: string,
  liked: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request(queueID));

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const queueTrackRef: FirestoreDoc = sessionRef.collection('queue').doc(queueID);
    const queueTrackLikesRef: FirestoreDocs = queueTrackRef.collection('likes');
    const timeLiked: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');
    const toggleLikeTransaction: Promise<number> = firestore.runTransaction(async transaction => {
      const doc: FirestoreDoc = await transaction.get(queueTrackRef);

      if (!doc.exists) throw new Error('Unable to retrieve queue track from Brassroots');

      const {totalLikes} = doc.data();

      transaction.update(queueTrackRef, {
        totalLikes: liked
          ? totalLikes - 1
          : firestore.FieldValue.increment(1),
        likes: liked
          ? firestore.FieldValue.arrayRemove(userID)
          : firestore.FieldValue.arrayUnion(userID)
      });
    });

    try {
      const promises = [
        toggleLikeTransaction,
        ...(liked
          ? [queueTrackLikesRef.doc(userID).delete()]
          : [queueTrackLikesRef.doc(userID).set({timeLiked, id: userID})]
        ),
      ];
      
      dispatch(actions.success(queueID));
      await Promise.all(promises);
    } catch (err) {
      dispatch(actions.failure(queueID, err));
    }
  };
}
