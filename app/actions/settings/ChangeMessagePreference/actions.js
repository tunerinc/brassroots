'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeMessagePreference
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a change message preference request
 * 
 * @alias module:ChangeMessagePreference
 * @function changeMessagePreferenceRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_MESSAGE_PREFERENCE_REQUEST
 */
export function changeMessagePreferenceRequest(): Action {
  return {
    type: types.CHANGE_MESSAGE_PREFERENCE_REQUEST,
  };
}

/**
 * Notify the app of a change message preference success
 * 
 * @alias module:ChangeMessagePreference
 * @function changeMessagePreferenceSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} status The updated message preference status for the current user
 *
 * @returns {object}        Redux action with the type of CHANGE_MESSAGE_PREFERENCE_SUCCESS and the updated preference status
 */
export function changeMessagePreferenceSuccess(
  status: string,
): Action {
  return {
    type: types.CHANGE_MESSAGE_PREFERENCE_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change message preference failure
 * 
 * @alias module:ChangeMessagePreference
 * @function changeMessagePreferenceFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change message preference failure
 *
 * @returns {object}       Redux action with the type of CHANGE_MESSAGE_PREFERENCE_FAILURE and the error which caused the failure
 */
export function changeMessagePreferenceFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_MESSAGE_PREFERENCE_FAILURE,
    error,
  };
}