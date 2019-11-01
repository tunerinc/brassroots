'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module TogglePause
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type Session = {|
  +id: string,
  +current: string,
  +progress: number,
|};

/**
 * Async function that pauses the track the current user is listening to
 * 
 * @async
 * @function togglePause
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID           The user id of the person pausing the session
 * @param    {string}  ownerID          The user id of the session owner
 * @param    {object}  session          The session object to pause the track in for the current user
 * @param    {string}  session.id       The id of the session to pause
 * @param    {string}  session.current  The currently playing track in the session
 * @param    {number}  session.progress The current progress of the session the user is pausing
 * @param    {boolean} paused           The new pause status for the current user in the now playing session
 *
 * @return   {Promise}
 * @resolves {object}                   The now playing session with the new pause status for the current user
 * @reject   {Error}                    The error which caused the toggle pause track failure
 */
export function togglePause(
  userID: string,
  ownerID: string,
  session: Session,
  paused: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(userID);

    let batch: FirestoreBatch = firestore.batch();
    let playbackState: {position?: number} = {};

    try {  
      if (paused) {
        await Spotify.setPlaying(false);
        playbackState = await Spotify.getPlaybackStateAsync();

        if (!playbackState || typeof playbackState.position !== 'number') {
          throw new Error('Unable to retrieve playback state');
        }

        session = updateObject(session, {progress: playbackState.position * 1000});
      }

      const timeLastPlayed: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

      if (typeof playbackState.position === 'number') {
        batch.update(sessionUserRef, {paused, progress: session.progress});

        if (ownerID === userID) {
          batch.update(sessionRef, {timeLastPlayed, paused, progress: session.progress});
        }
      } else {
        batch.update(sessionUserRef, {paused});

        if (ownerID === userID) {
          batch.update(sessionRef, {timeLastPlayed, paused});
        }
      }

      if (!paused) {
        await Spotify.playURI(`spotify:track:${session.current}`, 0, session.progress / 1000);
      }

      dispatch(actions.success(paused, session.progress));
      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    };
  };
}
