'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PausePlayer
 */

import Spotify from 'rn-spotify-sdk';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function that pauses the player for the listener
 * 
 * @async
 * @function pausePlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The id of the current session
 * @param    {string}  userID    The id of the current user
 * @param    {number}  progress  The progress where the current user is pausing
 * 
 * @return   {Promise}
 * @resolves {object}            Confirmation the listener's player has been paused
 * @rejects  {Error}             The error which caused the pause player failure
 */
export function pausePlayer(
  sessionID: string,
  userID: string,
  progress: number,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(userID);

    try {
      await  Spotify.setPlaying(false);
      dispatch(actions.success());
      await  sessionUserRef.update({progress, paused: true});
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}