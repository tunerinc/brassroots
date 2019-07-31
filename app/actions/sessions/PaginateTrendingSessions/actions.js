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
 * @function paginateTrendingSessionsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of PAGINATE_TRENDING_SESSIONS_REQUEST
 */
export function paginateTrendingSessionsRequest(): Action {
  return {type: types.PAGINATE_TRENDING_SESSIONS_REQUEST};
}

/**
 * Notify the app of a paginate trending sessions success
 * 
 * @alias module:PaginateTrendingSessions
 * @function paginateTrendingSessionsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {string[]} [sessions=[]]               The Brassroots ids of the paginated trending sessions
 * @param  {boolean}  [trendingCanPaginate=false] Whether the trending sessions can paginate
 * 
 * @return {object}                               Redux action with the type of PAGINATE_TRENDING_SESSIONS_SUCCESS and the paginated sessions
 */
export function paginateTrendingSessionsSuccess(
  sessions?: Array<string> = [],
  trendingCanPaginate?: boolean = false,
): Action {
  return {
    type: types.PAGINATE_TRENDING_SESSIONS_SUCCESS,
    sessions,
    trendingCanPaginate,
  };
}

/**
 * Notify the app of a paginate trending sessions failure
 * 
 * @alias module:PaginateTrendingSessions
 * @function paginateTrendingSessionsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the paginate trending sessions failure
 * 
 * @return {object}       Redux action with the type of PAGINATE_TRENDING_SESSIONS_FAILURE and the error which caused the failure
 */
export function paginateTrendingSessionsFailure(
  error: Error,
): Action {
  return {
    type: types.PAGINATE_TRENDING_SESSIONS_FAILURE,
    error,
  };
}