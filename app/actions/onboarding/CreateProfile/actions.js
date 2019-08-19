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
 * @function createProfileRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_PROFILE_REQUEST
 */
export function createProfileRequest(): Action {
  return {type: types.CREATE_PROFILE_REQUEST};
}

/**
 * Notify the app of a create profile success
 * 
 * @alias module:CreateProfile
 * @function createProfileSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_PROFILE_SUCCESS
 */
export function createProfileSuccess(): Action {
  return {type: types.CREATE_PROFILE_SUCCESS};
}

/**
 * Notify the app of a create profile failure
 * 
 * @alias module:CreateProfile
 * @function createProfileFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the create profile failure
 *
 * @returns {object}       Redux action with the type of CREATE_PROFILE_FAILURE and the error which caused the failure
 */
export function createProfileFailure(
  error: Error,
): Action {
  return {
    type: types.CREATE_PROFILE_FAILURE,
    error,
  };
}