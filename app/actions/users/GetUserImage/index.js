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
 * 
 * @param {*} userID 
 */
export function getUserImage(
  userID: string,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.getUserImageRequest());

    try {
      const {images} = await getUserProfile(userID);
      dispatch(actions.getUserImageSuccess(userID, images[0].url));
    } catch (err) {
      dispatch(actions.getUserImageFailure(err));
    }
  };
}