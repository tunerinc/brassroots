'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StartPlayer
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
 * Async function that starts the player for the listener at a specific position
 * 
 * @async
 * @function startPlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The id of the current session
 * @param    {string}  userID    The id of the current user
 * @param    {string}  trackID   The track id to start playing for the listener
 * @param    {number}  position  The position to start playing the track from
 * 
 * @return   {Promise}
 * @resolves {object}            Confirmation the listener's player has started playing
 * @rejects  {Error}             The error which caused the start player failure
 */
export function startPlayer(
  sessionID: string,
  userID: string,
  trackID: string,
  position: number,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.startPlayerRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(userID);

    try {
      const promises = [
        Spotify.playURI(`spotify:track:${trackID}`, 0, position),
        sessionUserRef.update({paused: false}),
      ];
      
      await Promise.all(promises);
      dispatch(actions.startPlayerSuccess());
    } catch (err) {
      dispatch(actions.startPlayerFailure(err));
    }
  };
}