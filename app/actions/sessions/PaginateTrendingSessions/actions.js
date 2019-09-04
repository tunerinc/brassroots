'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PaginateTrendingSessions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a paginate trending sessions request
 * 
 * @alias module:PaginateTrendingSessions
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of PAGINATE_TRENDING_SESSIONS_REQUEST
 */
export function request(): Action {
  return {type: types.PAGINATE_TRENDING_SESSIONS_REQUEST};
}

/**
 * Notify the app of a paginate trending sessions success
 * 
 * @alias module:PaginateTrendingSessions
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of PAGINATE_TRENDING_SESSIONS_SUCCESS
 */
export function success(): Action {
  return {type: types.PAGINATE_TRENDING_SESSIONS_SUCCESS};
}

/**
 * Notify the app of a paginate trending sessions failure
 * 
 * @alias module:PaginateTrendingSessions
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the paginate trending sessions failure
 * 
 * @return {object}       Redux action with the type of PAGINATE_TRENDING_SESSIONS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.PAGINATE_TRENDING_SESSIONS_FAILURE,
    error,
  };
}