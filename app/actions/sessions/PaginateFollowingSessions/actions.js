'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PaginateFollowingSessions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a paginate following sessions request
 * 
 * @alias module:PaginateFollowingSessions
 * @function paginateFollowingSessionsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of PAGINATE_FOLLOWING_SESSIONS_REQUEST
 */
export function paginateFollowingSessionsRequest(): Action {
  return {type: types.PAGINATE_FOLLOWING_SESSIONS_REQUEST};
}

/**
 * Notify the app of a paginate following sessions success
 * 
 * @alias module:PaginateFollowingSessions
 * @function paginateFollowingSessionsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {string[]} sessions             The Brassroots ids of the paginated following sessions
 * @param  {boolean}  followingCanPaginate Whether the following sessions can paginate
 * 
 * @return {object}                        Redux action with the type of PAGINATE_FOLLOWING_SESSIONS_SUCCESS and the paginated following sessions
 */
export function paginateFollowingSessionsSuccess(
  sessions: Array<string>,
  followingCanPaginate: boolean,
): Action {
  return {
    type: types.PAGINATE_FOLLOWING_SESSIONS_SUCCESS,
    sessions,
    followingCanPaginate,
  };
}

/**
 * Notify the app of a paginate following sessions failure
 * 
 * @alias module:PaginateFollowingSessions
 * @function paginateFollowingSessionsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the paginate following sessions failure
 * 
 * @return {object}       Redux action with the type of PAGINATE_FOLLOWING_SESSIONS_FAILURE and the error which caused the failure
 */
export function paginateFollowingSessionsFailure(
  error: Error,
): Action {
  return {
    type: types.PAGINATE_FOLLOWING_SESSIONS_FAILURE,
    error,
  };
}