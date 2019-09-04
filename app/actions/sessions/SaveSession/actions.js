'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveSession
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a save session request
 * 
 * @alias module:SaveSession
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of SAVE_SESSION_REQUEST
 */
export function request(): Action {
  return {type: types.SAVE_SESSION_REQUEST};
}

/**
 * Notify the app of a save session success
 * 
 * @alias module:SaveSession
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of SAVE_SESSION_SUCCESS
 */
export function success(): Action {
  return {type: types.SAVE_SESSION_SUCCESS};
}

/**
 * Notify the app of a save session failure
 * 
 * @alias module:SaveSession
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the save session failure
 * 
 * @returns {object}       Redux action with the type of SAVE_SESSION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.SAVE_SESSION_FAILURE,
    error,
  };
}