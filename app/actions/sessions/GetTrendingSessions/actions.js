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
 * @function getTrendingSessionsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_TRENDING_SESSIONS_REQUEST
 */
export function getTrendingSessionsRequest(): Action {
  return {type: types.GET_TRENDING_SESSIONS_REQUEST};
}

/**
 * Notify the app of a get trending sessions success
 * 
 * @alias module:GetTrendingSessions
 * @function getTrendingSessionsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string[]} trendingIDs=[]            The Brassroots ids of the trending sessions
 * @param   {boolean}  trendingCanPaginate=false Whether the trending sessions can paginate
 *
 * @returns {object}                             Redux action with the type of GET_TRENDING_SESSIONS_SUCCESS and the trending sessions
 */
export function getTrendingSessionsSuccess(
  trendingIDs?: Array<string> = [],
  trendingCanPaginate?: boolean = false,
): Action {
  return {
    type: types.GET_TRENDING_SESSIONS_SUCCESS,
    trendingIDs,
    trendingCanPaginate,
  };
}

/**
 * Notify the app of a get trending sessions failure
 * 
 * @alias module:GetTrendingSessions
 * @function getTrendingSessionsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get trending sessions failure
 *
 * @returns {object}       Redux action with the type of GET_TRENDING_SESSIONS_FAILURE and the error which caused the failure
 */
export function getTrendingSessionsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_TRENDING_SESSIONS_FAILURE,
    error,
  };
}