'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserImage
 */

import getUserProfile from '../../../utils/spotifyAPI/getUserProfile';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/users';

/**
 * Async function that gets the images for a user from Spotify
 * 
 * @async
 * @function getUserImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  userID The Spotify id of the user to get the images of
 * 
 * @returns  {Promise}
 * @resolves {string}         The profile photo uri of the user
 * @rejects  {Error}          The error which caused the get user image failure
 */
export function getUserImage(
  userID: string,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.getUserImageRequest());

    try {
      const {images} = await getUserProfile(userID);
      dispatch(actions.getUserImageSuccess());
    } catch (err) {
      dispatch(actions.getUserImageFailure(err));
    }
  };
}