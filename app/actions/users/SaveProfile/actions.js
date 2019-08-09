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
 * @function saveProfileRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of SAVE_PROFILE_REQUEST
 */
export function saveProfileRequest(): Action {
  return {type: types.SAVE_PROFILE_REQUEST};
}

/**
 * Notify the app of a save profile success
 * 
 * @alias module:SaveProfile
 * @function saveProfileSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of SAVE_PROFILE_SUCCESS
 */
export function saveProfileSuccess(): Action {
  return {type: types.SAVE_PROFILE_SUCCESS};
}

/**
 * Notify the app of a save profile failure
 * 
 * @alias module:SaveProfile
 * @function saveProfileFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the save profile failure
 *
 * @returns {object}       Redux action with the type of SAVE_PROFILE_FAILURE and the error which caused the failure
 */
export function saveProfileFailure(
  error: Error,
): Action {
  return {
    type: types.SAVE_PROFILE_FAILURE,
    error,
  };
}