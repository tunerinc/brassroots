'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopPlayer
 */

import moment from 'moment';
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
 * Async function that stops playback because there is no music queued.
 * 
 * @async
 * @function stopPlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The session id to stop playback for
 * 
 * @return   {Promise}
 * @resolves {object}            Confirmation the session's playback was stopped
 * @rejects  {Error}
 */
export function stopPlayer(
  sessionID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.stopPlayerRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const timeLastPlayed: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

    try {
      await sessionRef.update({timeLastPlayed, paused: true, currentProgressMS: 0});
      dispatch(actions.stopPlayerSuccess())
    } catch (err) {
      dispatch(actions.stopPlayerFailure(err));
    }
  };
}