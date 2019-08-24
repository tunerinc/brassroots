'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeMessagePreference
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change message preference request
 * 
 * @alias module:ChangeMessagePreference
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_MESSAGE_PREFERENCE_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_MESSAGE_PREFERENCE_REQUEST};
}

/**
 * Notify the app of a change message preference success
 * 
 * @alias module:ChangeMessagePreference
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} message The updated message preference status for the current user
 *
 * @returns {object}         Redux action with the type of CHANGE_MESSAGE_PREFERENCE_SUCCESS and the updated preference status
 */
export function success(
  message: string,
): Action {
  return {
    type: types.CHANGE_MESSAGE_PREFERENCE_SUCCESS,
    updates: {preference: {message}},
  };
}

/**
 * Notify the app of a change message preference failure
 * 
 * @alias module:ChangeMessagePreference
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change message preference failure
 *
 * @returns {object}       Redux action with the type of CHANGE_MESSAGE_PREFERENCE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_MESSAGE_PREFERENCE_FAILURE,
    error,
  };
}