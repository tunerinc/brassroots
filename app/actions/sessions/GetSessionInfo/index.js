'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetSessionInfo
 */

import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addPeople} from '../../users/AddPeople';
import {type ThunkAction} from '../../../reducers/sessions';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the info for a session from Ultrasound
 * 
 * @async
 * @function getSessionInfo
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The session id to retrieve the info for from Ultrasound
 * 
 * @return   {Promise}
 * @resolves {object}            The session info retrieved from Ultrasound when a change occurs
 * @rejects  {Error}             The error which caused the get session info failure
 */
export function getSessionInfo(
  sessionID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.getSessionInfoRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    
    try {
      
    } catch (err) {
      dispatch(actions.getSessionInfoFailure(err));
    }
  };
}