'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetRecentTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a get recent tracks request
 * 
 * @alias module:GetRecentTracks
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of GET_RECENT_TRACKS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_RECENT_TRACKS_REQUEST};
}

/**
 * Notify the app of a get recent tracks success
 * 
 * @alias module:GetRecentTracks
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object}        Redux action with the type of GET_RECENT_TRACKS_SUCCESS and the recent tracks
 */
export function success(): Action {
  return {type: types.GET_RECENT_TRACKS_SUCCESS};
}

/**
 * Notify the app of a get recent tracks failure
 * 
 * @alias module:GetRecentTracks
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the get recent tracks failure
 * 
 * @return {object}       Redux action with the type of GET_RECENT_TRACKS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_RECENT_TRACKS_FAILURE,
    error,
  };
}