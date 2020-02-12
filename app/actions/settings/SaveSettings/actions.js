'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveSettings
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a save settings request
 * 
 * @alias module:SaveSettings
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of SAVE_SETTINGS_REQUEST
 */
export function request(): Action {
  return {type: types.SAVE_SETTINGS_REQUEST};
}

/**
 * Notify the app of a save settings success
 * 
 * @alias module:SaveSettings
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of SAVE_SETTINGS_SUCCESS
 */
export function success(): Action {
  return {type: types.SAVE_SETTINGS_SUCCESS};
}

/**
 * Notify the app of a save settings failure
 * 
 * @alias module:SaveSettings
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the save settings failure
 * 
 * @returns {object}       Redux action with the type of SAVE_SETTINGS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.SAVE_SETTINGS_FAILURE,
    error,
  };
}