'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Notify the app of a get playlists request
 * 
 * @alias GetPlaylists
 * @function getPlaylistsRequest
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the playlists are being refreshed
 *
 * @returns {object}             Redux action with the type of GET_PLAYLISTS_REQUEST and whether we are refreshing the playlists
 */
export function getPlaylistsRequest(
  refreshing: boolean,
): Action {
  return {
    type: types.GET_PLAYLISTS_REQUEST,
    refreshing,
  };
}

/**
 * Notify the app of a get playlists success
 * 
 * @alias GetPlaylists
 * @function getPlaylistsSuccess
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} playlists The Spotify ids of the playlists the current user has saved
 *
 * @returns {object}             Redux action with the type of GET_PLAYLISTS_SUCCESS and the saved playlists
 */
export function getPlaylistsSuccess(
  playlists: Array<string>,
): Action {
  return {
    type: types.GET_PLAYLISTS_SUCCESS,
    playlists,
  };
}

/**
 * Notify the app of a get playlists failure
 * 
 * @alias GetPlaylists
 * @function getPlaylistsFailure
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get playlists failure
 *
 * @returns {object}       Redux action with the type of GET_PLAYLISTS_FAILURE and the error which caused the failure
 */
export function getPlaylistsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_PLAYLISTS_FAILURE,
    error,
  };
}