'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserSettings
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a get user settings request
 * 
 * @alias module:GetUserSettings
 * @function getUserSettingsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_USER_SETTINGS_REQUEST
 */
export function getUserSettingsRequest(): Action {
  return {
    type: types.GET_USER_SETTINGS_REQUEST,
  };
}

/**
 * Notify the app of a get user settings success
 * 
 * @alias module:GetUserSettings
 * @function getUserSettingsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object}          Redux action with the type of GET_USER_SETTINGS_SUCCESS
 */
export function getUserSettingsSuccess(): Action {
  return {
    type: types.GET_USER_SETTINGS_SUCCESS,
  };
}

/**
 * Notify the app of a get user settings failure
 * 
 * @alias module:GetUserSettings
 * @function getUserSettingsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get user settings failure
 *
 * @returns {object}       Redux action with the type of GET_USER_SETTINGS_FAILURE and the error which caused the failure
 */
export function getUserSettingsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_USER_SETTINGS_FAILURE,
    error,
  };
}