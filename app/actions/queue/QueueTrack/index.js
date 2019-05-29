'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module QueueTrack
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/queue';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type Session = {
  id: string,
  prevQueueID: string,
  totalQueue: number
};

type Track = {
  id: string,
  name: string,
  durationMS: number,
  album: {
    id: string,
    name: string,
    small: string,
    medium: string,
    large: string,
    artists: Array<
      {
        id: string,
        name: string,
      }
    >,
  },
  artists: Array<
    {
      id: string,
      name: string,
    }
  >,
};

type User = {
  id: string,
  displayName: string,
  profileImage: string,
};

/**
 * Async function that adds a track to the current session's queue
 * 
 * @async
 * @function queueTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {object}   session                    The session object to add the track to
 * @param  {string}   session.id                 The session id to queue a track in
 * @param  {string}   session.prevQueueID        The id of the queue track before the to-be-queued track
 * @param  {number}   session.totalQueue         The total amount of tracks left in the queue
 * @param  {object}   track                      The Spotify track object to queue in the session
 * @param  {string}   track.id                   The Spotify id for the track to queue
 * @param  {string}   track.name                 The name of the track to queue
 * @param  {number}   track.durationMS           The duration of the track in milliseconds
 * @param  {object}   track.album                The Spotify album object of the track
 * @param  {string}   track.album.id             The Spotify id of the track's album
 * @param  {string}   track.album.name           The name of the track's album
 * @param  {string}   [track.album.small]        64x64 size of the album's artwork
 * @param  {string}   [track.album.medium]       300x300 size of the album's artwork
 * @param  {string}   [track.album.large]        640x640 size of the album's artwork
 * @param  {object[]} track.album.artists        The artists of the track
 * @param  {string}   track.album.artists[].id   The Spotify id for the track artist
 * @param  {string}   track.album.artists[].name The name of the track artist
 * @param  {object[]} track.artists              The artists of the track
 * @param  {string}   track.artists.id           The Spotify id for the track artist
 * @param  {string}   track.artists.name         The name of the track artist
 * @param  {object}   user                       The user object of the user queueing the track
 * @param  {string}   user.id                    The Brassroots id of the user queueing the track
 * @param  {string}   user.displayName           The display name of the user queueing the track
 * @param  {string}   user.profileImage          The profile image of the user queueing the track
 *
 * @return {Promise}
 * @fulfil {object}                        The now playing session with the new track added to the queue
 * @reject {Error}                         The error which caused the queue track failure
 */
export function queueTrack(
  session: Session,
  track: Track,
  user: User,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.queueTrackRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const queueRef: FirestoreDocs = sessionRef.collection('queue');
    const queueDoc: FirestoreDoc = queueRef.doc();
    const queueID: string = queueDoc.id;
    const {totalQueue, prevQueueID} = session;

    let batch: FirestoreBatch = firestore.batch();

    try {
      batch.update(sessionRef, {'totals.queue': totalQueue + 1});
      batch.update(queueRef.doc(prevQueueID), {nextQueueID: queueID});
      batch.set(
        queueRef.doc(queueID),
        {
          track,
          user,
          prevQueueID,
          id: queueID,
          nextQueueID: null,
          timeAdded: firestore.FieldValue.serverTimestamp(),
          added: true,
          totalLikes: 0,
        },
      );

      await batch.commit();
      dispatch(actions.queueTrackSuccess());
    } catch (err) {
      dispatch(actions.queueTrackFailure(err))
    }
  };
}
