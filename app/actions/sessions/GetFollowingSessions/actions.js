'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetFollowingSessions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a get following sessions request
 * 
 * @alias module:GetFollowingSessions
 * @function getFollowingSessionsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_FOLLOWING_SESSIONS_REQUEST
 */
export function getFollowingSessionsRequest(): Action {
  return {type: types.GET_FOLLOWING_SESSIONS_REQUEST};
}

/**
 * Notify the app of a get following sessions success
 * 
 * @alias module:GetFollowingSessions
 * @function getFollowingSessionSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string[]} followingIDs         The Brassroots ids of the sessions of users the current user follows
 * @param   {boolean}  followingCanPaginate Whether the following sessions can paginate
 *
 * @returns {object}                        Redux action with the type of GET_FOLLOWING_SESSIONS_SUCCESS and the following sessions
 */
export function getFollowingSessionsSuccess(
  followingIDs?: Array<string> = [],
  followingCanPaginate?: boolean = false,
): Action {
  return {
    type: types.GET_FOLLOWING_SESSIONS_SUCCESS,
    followingIDs,
    followingCanPaginate,
  };
}

/**
 * Notify the app of a get following sessions failure
 * 
 * @alias module:GetFollowingSessions
 * @function getFollowingSessionsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get following sessions failure
 *
 * @returns {object}       Redux action with the type of GET_FOLLOWING_SESSIONS_FAILURE and the error which caused the failure and the error which caused the failure
 */
export function getFollowingSessionsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_FOLLOWING_SESSIONS_FAILURE,
    error,
  };
}