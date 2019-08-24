'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module LogOut
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a log out request
 * 
 * @alias module:LogOut
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of LOG_OUT_REQUEST
 */
export function request(): Action {
  return {type: types.LOG_OUT_REQUEST};
}

/**
 * Notify the app of a log out success
 * 
 * @alias module:LogOut
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of LOG_OUT_SUCCESS
*/
export function success(): Action {
  return {type: types.LOG_OUT_SUCCESS};
}

/**
 * Notify the app of a log out failure
 * 
 * @alias module:LogOut
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the log out failure
 * 
 * @returns {object}       Redux action with the type of LOG_OUT_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.LOG_OUT_FAILURE,
    error,
  };
}