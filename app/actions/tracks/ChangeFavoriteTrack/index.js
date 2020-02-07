'use strict';

/**
 * @format
 * @flow
 */ 

/**
 * @module ChangeFavoriteTrack
 */

import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/tracks';
import {type FirestoreInstance} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the favorite song of the current user
 * 
 * @async
 * @function changeFavoriteTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  userID          The id of the current user
 * @param    {string}  favoriteTrackID The track id to change as the current user's new favorite track
 * 
 * @returns  {Promise}
 * @resolves {object}                  Confirmation the current user's favorite track was changed
 * @rejects  {Error}                   The error which caused the change favorite track failure
 */
export function changeFavoriteTrack(
  userID: string,
  favoriteTrackID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());
    
    const firestore: FirestoreInstance = getFirestore();

    try {
      dispatch(addEntities({users: {[userID]: {id: userID, favoriteTrackID}}}));
      dispatch(actions.success());
      await firestore.collection('users').doc(userID).update({favoriteTrackID});
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}