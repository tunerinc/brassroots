'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTopPlaylists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Notify the app of a get top playlists request
 * 
 * @alias module:GetTopPlaylists
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_TOP_PLAYLISTS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_TOP_PLAYLISTS_REQUEST};
}

/**
 * Notify the app of a get top playlists success
 * 
 * @alias module:GetTopPlaylists
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_TOP_PLAYLISTS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_TOP_PLAYLISTS_SUCCESS};
}

/**
 * Notify the app of a get top playlists failure
 * 
 * @alias module:GetTopPlaylists
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get top playlists failure
 *
 * @returns {object}       Redux action with the type of GET_TOP_PLAYLISTS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_TOP_PLAYLISTS_FAILURE,
    error,
  };
}