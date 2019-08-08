'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PaginateNearbySessions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a paginate nearby sessions request
 * 
 * @alias module:PaginateNearbySessions
 * @function paginateNearbySessionsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of PAGINATE_NEARBY_SESSIONS_REQUEST
 */
export function paginateNearbySessionsRequest(): Action {
  return {type: types.PAGINATE_NEARBY_SESSIONS_REQUEST};
}

/**
 * Notify the app of a paginate nearby sessions success
 * 
 * @alias module:PaginateNearbySessions
 * @function paginateNearbySessionsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {string[]} sessions          The Brassroots ids of the paginated nearby sessions
 * @param  {boolean}  nearbyCanPaginate Whether the nearby sessions can paginate
 * 
 * @return {object}                     Redux action with the type of PAGINATE_NEARBY_SESSIONS_SUCCESS and the nearby sessions
 */
export function paginateNearbySessionsSuccess(
  sessions: Array<string>,
  nearbyCanPaginate: boolean,
): Action {
  return {
    type: types.PAGINATE_NEARBY_SESSIONS_SUCCESS,
    sessions,
    nearbyCanPaginate,
  };
}

/**
 * Notify the app of a paginate nearby sessions failure
 * 
 * @alias module:PaginateNearbySessions
 * @function paginateNearbySessionsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the paginate nearby sessions failure
 * 
 * @return {object}       Redux action with the type of PAGINATE_NEARBY_SESSIONS_FAILURE and the error which caused the failure
 */
export function paginateNearbySessionsFailure(
  error: Error,
): Action {
  return {
    type: types.PAGINATE_NEARBY_SESSIONS_FAILURE,
    error,
  };
}