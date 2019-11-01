'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveSession
 */

import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {
  type Session,
  type ThunkAction,
} from '../../../reducers/sessions';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function that saves new information for a session
 * 
 * @async
 * @function saveSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The Brassroots id of the session
 * @param    {object}  updates   The updates to make to the session
 * 
 * @returns  {Promise}
 * @resolves {object}            The session with the new information saved
 * @rejects  {Error}             The error which caused the save session failure
 */
export function saveSession(
  sessionID: string,
  updates: Session,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);

    try {
      if (typeof sessionID === 'string') {
        dispatch(addEntities({sessions: {[sessionID]: {id: sessionID, ...updates}}}));
        await sessionRef.update({...updates});
      }

      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}