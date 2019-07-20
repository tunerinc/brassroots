'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module DeleteQueueTrack
 */

import * as actions from './actions';
import {updatePlayer} from '../../player/UpdatePlayer';
import {type ThunkAction} from '../../../reducers/queue';
import {
  type FirestoreInstance,
  type FirestoreDocs,
  type FirestoreDoc,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type Session = {|
  +id: string,
  +total: number,
  +isLast: boolean,
|};

/**
 * Async function that deletes a track from a session's queue
 * 
 * @async
 * @alias module:DeleteQueueTrack
 * @function deleteQueueTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {object}  session        The session object to delete a track from the queue
 * @param    {string}  session.id     The session id to delete the track from
 * @param    {number}  session.total  The total next to play tracks from the session
 * @param    {boolean} session.isLast Whether the track to be deleted is the last track in the queue
 * @param    {string}  queueID        The track's queue id to delete from the queue
 * 
 * @returns  {Promise}
 * @resolves {object}                 The track that was deleted from the session's queue
 * @rejects  {Error}                  The error which caused the delete queue track failure
 */
export function deleteQueueTrack(
  session: Session,
  queueID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.deleteQueueTrackRequest(queueID));

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const queueRef: FirestoreDocs = sessionRef.collection('queue');

    let batch: FirestoreBatch = firestore.batch();

    try {
      const queueTrack: FirestoreDoc = await queueRef.doc(queueID).get();
      const {prevQueueID, prevTrackID, nextQueueID, nextTrackID, likes} = queueTrack.data();

      if (nextQueueID && nextTrackID) {
        batch.update(queueRef.doc(prevQueueID), {nextQueueID, nextTrackID});
      } else {
        batch.update(
          queueRef.doc(prevQueueID),
          {
            nextQueueID: null,
            nextTrackID: null,
          },
        );
      }

      if (session.total === 1) {
        dispatch(updatePlayer({nextQueueID: null, nextTrackID: null}));
      }

      likes.forEach(userID => {
        const likesDoc: FirestoreDoc = queueRef.doc(queueID).collection('likes').doc(userID);
        batch.delete(likesDoc);
      });

      batch.delete(queueRef.doc(queueID));
      batch.update(sessionRef, {'totals.queue': session.total - 1});

      await batch.commit();
      dispatch(actions.deleteQueueTrackSuccess(queueID));
    } catch (err) {
      dispatch(actions.deleteQueueTrackFailure(queueID, err));
    }
  };
}