'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTopTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Notify the app of a get playlist top tracks request
 * 
 * @alias module:GetPlaylistTopTracks
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_PLAYLIST_TOP_TRACKS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_PLAYLIST_TOP_TRACKS_REQUEST};
}

/**
 * Notify the app of a get playlist top tracks success
 * 
 * @alias module:GetPlaylistTopTracks
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_PLAYLIST_TOP_TRACKS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_PLAYLIST_TOP_TRACKS_SUCCESS};
}

/**
 * Notify the app of a get playlist top tracks failure
 * 
 * @alias module:GetPlaylistTopTracks
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get playlist top tracks failure
 *
 * @returns {object}       Redux action with the type of GET_PLAYLIST_TOP_TRACKS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_PLAYLIST_TOP_TRACKS_FAILURE,
    error,
  };
}