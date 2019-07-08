'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserImage
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * 
 */
export function getUserImageRequest(): Action {
  return {
    type: types.GET_USER_IMAGE_REQUEST,
  };
}

/**
 * 
 * @param {*} userID 
 * @param {*} photo 
 */
export function getUserImageSuccess(
  userID: string,
  photo: ?string,
): Action {
  return {
    type: types.GET_USER_IMAGE_SUCCESS,
    userID,
    photo,
  };
}

/**
 * 
 * @param {*} error 
 */
export function getUserImageFailure(
  error: Error,
): Action {
  return {
    type: types.GET_USER_IMAGE_FAILURE,
    error,
  };
}