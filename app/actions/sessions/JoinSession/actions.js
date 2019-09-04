'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module JoinSession
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a join session request
 * 
 * @alias module:JoinSession
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of JOIN_SESSION_REQUEST
 */
export function request(): Action {
  return {type: types.JOIN_SESSION_REQUEST};
}

/**
 * Notify the app of a join session success
 * 
 * @alias module:JoinSession
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of JOIN_SESSION_SUCCESS
 */
export function success(): Action {
  return {type: types.JOIN_SESSION_SUCCESS};
}

/**
 * Notify the app of a join session failure
 * 
 * @alias module:JoinSession
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the join session failure
 *
 * @returns {object}       Redux action with the type of JOIN_SESSION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.JOIN_SESSION_FAILURE,
    error,
  };
}