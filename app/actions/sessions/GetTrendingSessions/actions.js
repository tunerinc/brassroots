'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTrendingSessions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a get trending sessions request
 * 
 * @alias module:GetTrendingSessions
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_TRENDING_SESSIONS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_TRENDING_SESSIONS_REQUEST};
}

/**
 * Notify the app of a get trending sessions success
 * 
 * @alias module:GetTrendingSessions
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_TRENDING_SESSIONS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_TRENDING_SESSIONS_SUCCESS};
}

/**
 * Notify the app of a get trending sessions failure
 * 
 * @alias module:GetTrendingSessions
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get trending sessions failure
 *
 * @returns {object}       Redux action with the type of GET_TRENDING_SESSIONS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_TRENDING_SESSIONS_FAILURE,
    error,
  };
}