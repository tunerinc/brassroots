'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionPreference
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a change session preference request
 * 
 * @alias module:ChangeSessionPreference
 * @function changeSessionPreferenceRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_SESSION_PREFERENCE_REQUEST
 */
export function changeSessionPreferenceRequest(): Action {
  return {
    type: types.CHANGE_SESSION_PREFERENCE_REQUEST,
  };
}

/**
 * Notify the app of a change session preference success
 * 
 * @alias module:ChangeSessionPreference
 * @function changeSessionPreferenceSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} status The updated session preference status for the current user
 *
 * @returns {object}        Redux action with the type of CHANGE_SESSION_PREFERENCE_SUCCESS and the updated preference status
 */
export function changeSessionPreferenceSuccess(
  status: string,
): Action {
  return {
    type: types.CHANGE_SESSION_PREFERENCE_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change session preference failure
 * 
 * @alias module:ChangeSessionPreference
 * @function changeSessionPreferenceFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change session preference failure
 *
 * @returns {object}       Redux action with the type of CHANGE_SESSION_PREFERENCE_FAILURE and the error which caused the failure
 */
export function changeSessionPreferenceFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_SESSION_PREFERENCE_FAILURE,
    error,
  };
}