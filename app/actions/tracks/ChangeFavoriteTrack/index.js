'use strict';

/**
 * @format
 * @flow
 */ 

/**
 * @module ChangeFavoriteTrack
 */

import {addFavoriteTrack} from '../../users/AddFavoriteTrack';
import * as actions from './actions';
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
 * @param    {string}  userID  The id of the current user
 * @param    {string}  trackID The track id to change as the current user's new favorite track
 * 
 * @returns  {Promise}
 * @resolves {object}          Confirmation the current user's favorite track was changed
 * @rejects  {Error}           The error which caused the change favorite track failure
 */
export function changeFavoriteTrack(
  userID: string,
  trackID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.changeFavoriteTrackRequest());
    
    const firestore: FirestoreInstance = getFirestore();

    try {
      await firestore.collection('users').doc(userID).update({favoriteTrackID: trackID});
      dispatch(addFavoriteTrack(trackID));
      dispatch(actions.changeFavoriteTrackSuccess());
    } catch (err) {
      dispatch(actions.changeFavoriteTrackFailure(err));
    }
  };
}