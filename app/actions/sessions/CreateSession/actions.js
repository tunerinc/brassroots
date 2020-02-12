'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateSession
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a create session request
 * 
 * @alias module:CreateSession
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_SESSION_REQUEST
 */
export function request(): Action {
  return {type: types.CREATE_SESSION_REQUEST};
}

/**
 * Notify the app of a create session success
 * 
 * @alias module:CreateSession
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_SESSION_SUCCESS
 */
export function success(): Action {
  return {type: types.CREATE_SESSION_SUCCESS};
}

/**
 * Notify the app of a create session failure
 * 
 * @alias module:CreateSession
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the create session failure
 *
 * @returns {object}       Redux action with the type of CREATE_SESSION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CREATE_SESSION_FAILURE,
    error,
  };
}