'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeProfilePhoto
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Notify the app of a change profile photo request
 * 
 * @alias module:ChangeProfilePhoto
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_PROFILE_PHOTO_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_PROFILE_PHOTO_REQUEST};
}

/**
 * Notify the app of a change profile photo success
 * 
 * @alias module:ChangeProfilePhoto
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_PROFILE_PHOTO_SUCCESS
 */
export function success(): Action {
  return {type: types.CHANGE_PROFILE_PHOTO_SUCCESS};
}

/**
 * Notify the app of a change profile photo failure
 * 
 * @alias module:ChangeProfilePhoto
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change profile photo failure
 *
 * @returns {object}       Redux action with the type of CHANGE_PROFILE_PHOTO_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_PROFILE_PHOTO_FAILURE,
    error,
  };
}