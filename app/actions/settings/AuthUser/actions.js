'use strict';

/**
 * @format
 * @flow
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * @module AuthorizeUser
 */

/**
 * Notify the app of an authorize user request
 * 
 * @alias module:AuthorizeUser
 * @function authorizeUserRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of AUTHORIZE_USER_REQUEST
 */
export function authorizeUserRequest(): Action {
  return {
    type: types.AUTHORIZE_USER_REQUEST,
  };
}

/**
 * Notify the app of an authorize user success
 * 
 * @alias module:AuthorizeUser
 * @function authorizeUserSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of AUTHORIZE_USER_SUCCESS
 */
export function authorizeUserSuccess(): Action {
  return {
    type: types.AUTHORIZE_USER_SUCCESS,
  };
}

/**
 * Notify the app of an authorize user failure
 * 
 * @alias module:AuthorizeUser
 * @function authorizeUserFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the authorize user failure
 *
 * @returns {object}       Redux action with the type of AUTHORIZE_USER_FAILURE and the error which caused the failure
 */
export function authorizeUserFailure(
  error: Error,
): Action {
  return {
    type: types.AUTHORIZE_USER_FAILURE,
    error,
  };
}