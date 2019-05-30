'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetNearbySessions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a get nearby sessions request
 * 
 * @alias module:GetNearbySessions
 * @function getNearbySessionsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_NEARBY_SESSIONS_REQUEST
 */
export function getNearbySessionsRequest(): Action {
  return {
    type: types.GET_NEARBY_SESSIONS_REQUEST,
  };
}

/**
 * Notify the app of a get nearby sessions success
 * 
 * @alias module:GetNearbySessions
 * @function getNearbySessionsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string[]} nearbySessions    The Brassroots ids of the nearby sessions
 * @param   {boolean}  nearbyCanPaginate Whether the nearby sessions can paginate
 *
 * @returns {object}                     Redux action with the type of GET_NEARBY_SESSIONS_SUCCESS and the nearby sessions
 */
export function getNearbySessionsSuccess(
  nearbySessions: Array<string>,
  nearbyCanPaginate: boolean,
): Action {
  return {
    type: types.GET_NEARBY_SESSIONS_SUCCESS,
    nearbySessions,
    nearbyCanPaginate,
  };
}

/**
 * Notify the app of a get nearby sessions failure
 * 
 * @alias module:GetNearbySessions
 * @function getNearbySessionsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get nearby sessions failure
 *
 * @returns {object}       Redux action with the type of GET_NEARBY_SESSIONS_FAILURE and the error which caused the failure and the error which caused the failure
 */
export function getNearbySessionsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_NEARBY_SESSIONS_FAILURE,
    error,
  };
}