'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Notify the app of a get playlist tracks request
 * 
 * @alias GetPlaylistTracks
 * @function getPlaylistTracksRequest
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing the playlist tracks
 * 
 * @returns {object}             Redux action with the type of GET_PLAYLIST_TRACKS_REQUEST and whether the current user is refreshing
 */
export function getPlaylistTracksRequest(
  refreshing: boolean,
): Action {
  return {
    type: types.GET_PLAYLIST_TRACKS_REQUEST,
    refreshing,
  };  
}

/**
 * Notify the app of a get playlist tracks success
 * 
 * @alias GetPlaylistTracks
 * @function getPlaylistTracksSuccess
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_PLAYLIST_TRACKS_SUCCESS
 */
export function getPlaylistTracksSuccess(): Action {
  return {type: types.GET_PLAYLIST_TRACKS_SUCCESS};
}

/**
 * Notify the app of a get playlist tracks failure
 * 
 * @alias GetPlaylistTracks
 * @function getPlaylistTracksFailure
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error} error The error which caused the get playlist tracks failure
 * 
 * @returns {object}      Redux action with the type of GET_PLAYLIST_TRACKS_FAILURE and the error which caused the failure
 */
export function getPlaylistTracksFailure(
  error: Error,
): Action {
  return {
    type: types.GET_PLAYLIST_TRACKS_FAILURE,
    error,
  };
}