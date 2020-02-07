'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateProfile
 */

import * as types from '../types';
import {type Action} from '../../../reducers/onboarding';

/**
 * Notify the app of a create profile request
 * 
 * @alias module:CreateProfile
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_PROFILE_REQUEST
 */
export function request(): Action {
  return {type: types.CREATE_PROFILE_REQUEST};
}

/**
 * Notify the app of a create profile success
 * 
 * @alias module:CreateProfile
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_PROFILE_SUCCESS
 */
export function success(): Action {
  return {type: types.CREATE_PROFILE_SUCCESS};
}

/**
 * Notify the app of a create profile failure
 * 
 * @alias module:CreateProfile
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the create profile failure
 *
 * @returns {object}       Redux action with the type of CREATE_PROFILE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CREATE_PROFILE_FAILURE,
    error,
  };
}