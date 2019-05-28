'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeCoverPhoto
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Notify the app of a change cover photo request
 * 
 * @alias module:ChangeCoverPhoto
 * @function changeCoverPhotoRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_COVER_PHOTO_REQUEST
 */
export function changeCoverPhotoRequest() {
  return {
    type: types.CHANGE_COVER_PHOTO_REQUEST,
  };
}

/**
 * Notify the app of a change cover photo success
 * 
 * @alias module:ChangeCoverPhoto
 * @function changeCoverPhotoSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} [photo=null] The cover photo uri to save for the current user
 *
 * @returns {object}              Redux action with the type of CHANGE_COVER_PHOTO_SUCCESS and the cover photo uri to save
 */
export function changeCoverPhotoSuccess(
  photo: ?string = null,
): Action {
  return {
    type: types.CHANGE_COVER_PHOTO_SUCCESS,
    photo,
  };
}

/**
 * Notify the app of a change cover photo failure
 * 
 * @alias module:ChangeCoverPhoto
 * @function changeCoverPhotoFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change cover photo failure
 *
 * @returns {object}       Redux action with the type of CHANGE_COVER_PHOTO_FAILURE and the error which caused the failure
 */
export function changeCoverPhotoFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_COVER_PHOTO_FAILURE,
    error,
  };
}