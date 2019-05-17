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
import type {Action, State} from '../../../reducers/player';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreDoc,
} from '../../../utils/firebaseTypes';

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

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
    dispatch(actions.pausePlayerRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(userID);

    try {
      const promises = [
        Spotify.setPlaying(false),
        sessionUserRef.update({progress, paused: true}),
      ];
      
      await Promise.all(promises);
      dispatch(actions.pausePlayerSuccess());
    } catch (err) {
      dispatch(actions.pausePlayerFailure(err));
    }
  };
}