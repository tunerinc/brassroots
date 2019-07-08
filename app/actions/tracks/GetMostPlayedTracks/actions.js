'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetMostPlayedTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a get most played tracks request
 * 
 * @alias module:GetMostPlayedTracks
 * @function getMostPlayedTracksRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_MOST_PLAYED_TRACKS_REQUEST
 */
export function getMostPlayedTracksRequest(): Action {
  return {
    type: types.GET_MOST_PLAYED_TRACKS_REQUEST,
  };
}

/**
 * Notify the app of a get most played tracks success
 * 
 * @alias module:GetMostPlayedTracks
 * @function getMostPlayedTracksSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object}        Redux action with the type of GET_MOST_PLAYED_TRACKS_SUCCESS and the most played tracks
 */
export function getMostPlayedTracksSuccess(): Action {
  return {
    type: types.GET_MOST_PLAYED_TRACKS_SUCCESS,
  };
}

/**
 * Notify the app of a get most played tracks failure
 * 
 * @alias module:GetMostPlayedTracks
 * @function getMostPlayedTracksFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get most played tracks failure
 *
 * @returns {object}       Redux action with the type of GET_MOST_PLAYED_TRACKS_FAILURE and the error which caused the failure
 */
export function getMostPlayedTracksFailure(
  error: Error,
): Action {
  return {
    type: types.GET_MOST_PLAYED_TRACKS_FAILURE,
    error,
  };
}