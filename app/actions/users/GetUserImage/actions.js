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
 * Notify the app of a get user image request
 * 
 * @alias module:GetUserImage
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_USER_IMAGE_REQUEST
 */
export function request(): Action {
  return {type: types.GET_USER_IMAGE_REQUEST};
}

/**
 * Notify the app of a get user image success
 * 
 * @alias module:GetUserImage
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_USER_IMAGE_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_USER_IMAGE_SUCCESS};
}

/**
 * Notify the app of a get user image failure
 * 
 * @alias module:GetUserImage
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.om>
 * 
 * @param   {Error}  error The error which caused the get user image failure
 * 
 * @returns {object}       Redux action with the type of GET_USER_IMAGE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_USER_IMAGE_FAILURE,
    error,
  };
}