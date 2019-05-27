'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a get tracks request
 * 
 * @alias module:GetTracks
 * @function getTracksRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing their saved tracks
 *
 * @returns {object}             Redux action with the type of GET_TRACKS_REQUEST and whether the current user is refreshing
 */
export function getTracksRequest(
  refreshing: boolean,
): Action {
  return {
    type: types.GET_TRACKS_REQUEST,
    refreshing,
  };
}

/**
 * Notify the app of a get tracks success
 * 
 * @alias module:GetTracks
 * @function getTracksSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} tracks The Spotify track ids from the current user's library
 *
 * @returns {object}          Redux action with the type of GET_TRACKS_SUCCESS and the tracks from the library
 */
export function getTracksSuccess(
  tracks: Array<string>,
): Action {
  return {
    type: types.GET_TRACKS_SUCCESS,
    tracks,
  };
}

/**
 * Notify the app of a get tracks failure
 * 
 * @alias module:GetTracks
 * @function getTracksFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get tracks failure
 *
 * @returns {object}       Redux action with the type of GET_TRACKS_FAILURE and the error which caused the failure
 */
export function getTracksFailure(
  error: Error,
): Action {
  return {
    type: types.GET_TRACKS_FAILURE,
    error,
  };
}