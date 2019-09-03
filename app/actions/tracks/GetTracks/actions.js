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
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing their saved tracks
 *
 * @returns {object}             Redux action with the type of GET_TRACKS_REQUEST and whether the current user is refreshing
 */
export function request(
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
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} tracks          The Spotify track ids from the current user's library
 * @param   {number}   total           The total number of tracks in the current user's library
 * @param   {boolean}  [replace=false] Whether or not the tracks need to be replaced
 *
 * @returns {object}                   Redux action with the type of GET_TRACKS_SUCCESS, the tracks from the library, the total number of tracks, and whether to replace the cached tracks
 */
export function success(
  tracks: Array<string>,
  total: number,
  replace?: boolean = false,
): Action {
  return {
    type: types.GET_TRACKS_SUCCESS,
    tracks,
    total,
    replace,
  };
}

/**
 * Notify the app of a get tracks failure
 * 
 * @alias module:GetTracks
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get tracks failure
 *
 * @returns {object}       Redux action with the type of GET_TRACKS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_TRACKS_FAILURE,
    error,
  };
}