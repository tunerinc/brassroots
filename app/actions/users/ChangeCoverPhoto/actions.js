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
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_COVER_PHOTO_REQUEST
 */
export function request() {
  return {type: types.CHANGE_COVER_PHOTO_REQUEST};
}

/**
 * Notify the app of a change cover photo success
 * 
 * @alias module:ChangeCoverPhoto
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_COVER_PHOTO_SUCCESS
 */
export function success(): Action {
  return {type: types.CHANGE_COVER_PHOTO_SUCCESS};
}

/**
 * Notify the app of a change cover photo failure
 * 
 * @alias module:ChangeCoverPhoto
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change cover photo failure
 *
 * @returns {object}       Redux action with the type of CHANGE_COVER_PHOTO_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_COVER_PHOTO_FAILURE,
    error,
  };
}