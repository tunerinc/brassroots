'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveProfile
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Notify the app of a save profile request
 * 
 * @alias module:SaveProfile
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of SAVE_PROFILE_REQUEST
 */
export function request(): Action {
  return {type: types.SAVE_PROFILE_REQUEST};
}

/**
 * Notify the app of a save profile success
 * 
 * @alias module:SaveProfile
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of SAVE_PROFILE_SUCCESS
 */
export function success(): Action {
  return {type: types.SAVE_PROFILE_SUCCESS};
}

/**
 * Notify the app of a save profile failure
 * 
 * @alias module:SaveProfile
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the save profile failure
 *
 * @returns {object}       Redux action with the type of SAVE_PROFILE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.SAVE_PROFILE_FAILURE,
    error,
  };
}