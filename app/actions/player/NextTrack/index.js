'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module NextTrack
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {removeQueueTrack} from '../../queue/RemoveQueueTrack';
import {updatePlayer} from '../UpdatePlayer';
import {type TrackArtist} from '../../../reducers/tracks';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type User = {
  id: string,
  displayName: string,
  profileImage: string,
};

type Session = {
  id: string,
  totalQueue: number,
  totalPlayed: number,
  totalUsers: number,
  coords?: {
    lat: number,
    lon: number,
  },
  current: string,
};

/**
 * Async function which plays the next track in the queue
 * 
 * @async
 * @function nextTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {object}   user
 * @param    {string}   user.id             The user id of the current user
 * @param    {string}   user.displayName    The display name of the current user
 * @param    {string}   user.profileImage   The profile image of the current user
 * @param    {string}   session             The session object to play the next track in
 * @param    {string}   session.id          The id of the session to play the next track in
 * @param    {number}   session.totalQueue  The tracks which are next to play in the session
 * @param    {number}   session.totalPlayed The total amount of played tracks in the session
 * @param    {number}   session.totalUsers  The total amount of listeners in the session
 * @param    {object}   [session.coords]    The coordinates of the session the current user is in
 * @param    {number}   session.coords.lat  The latitude of the gps coordinates
 * @param    {number}   session.coords.lon  The longitude of the gps coordinates
 * @param    {string}   session.current     The queue id of the current track playing in the session
 * @param    {string}   nextQueueID         The queue id of the next track to play
 *
 * @returns  {Promise}
 * @resolves {object}                       The now playing session with the next track now playing
 * @reject   {Error}                        The error which caused the next track failure
 */
export function nextTrack(
  user: User,
  session: Session,
  nextQueueID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const sessionPrevRef: FirestoreDocs = sessionRef.collection('previouslyPlayed');
    const sessionQueueRef: FirestoreDocs = sessionRef.collection('queue');
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(user.id);
    const {totalQueue, totalPlayed, totalUsers, current, coords} = session;

    let batch: FirestoreBatch = firestore.batch();

    try {
      // dispatch(addRecentTrack(user.id, current.track));

      const [currentDoc, nextDoc] = await Promise.all(
        [
          sessionQueueRef.doc(current).get(),
          sessionQueueRef.doc(nextQueueID).get(),
        ],
      );

      if (!currentDoc.exists || !nextDoc.exists) {
        throw new Error('Unable to retrieve tracks from Firestore');
      }

      await Spotify.playURI(`spotify:track:${nextDoc.data().track.id}`, 0, 0);

      dispatch(removeQueueTrack(nextQueueID));
      dispatch(
        actions.success(
          nextQueueID,
          nextDoc.data().track.id,
          nextDoc.data().track.durationMS,
          nextDoc.data().nextQueueID,
          nextDoc.data().nextTrackID,
        ),
      );

      batch.update(sessionQueueRef.doc(nextQueueID), {isCurrent: true});
      batch.update(sessionUserRef, {progress: 0, paused: false});
      batch.set(
        sessionPrevRef.doc(current),
        {
          id: current,
          userID: currentDoc.data().user.id,
          totalLikes: currentDoc.data().totalLikes,
          prevQueueID: currentDoc.data().prevQueueID,
          prevTrackID: currentDoc.data().prevTrackID,
          nextTrackID: currentDoc.data().nextTrackID,
          nextQueueID: currentDoc.data().nextQueueID,
          track: {...currentDoc.data().track},
        },
      );

      batch.delete(sessionQueueRef.doc(current));
      batch.update(
        sessionRef,
        {
          progress: 0,
          currentQueueID: nextQueueID,
          currentTrackID: nextDoc.data().track.id,
          timeLastPlayed: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          paused: false,
          'totals.previouslyPlayed': totalPlayed + 1,
          'totals.queue': totalQueue - 1,
        },
      );
      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
