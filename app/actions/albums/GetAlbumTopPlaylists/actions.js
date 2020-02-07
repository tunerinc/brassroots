'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopPlaylists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/albums';

/**
 * Notify the app of a get album top playlists request
 * 
 * @alias module:GetAlbumTopPlaylists
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object}         Redux action with the type of GET_ALBUM_TOP_PLAYLISTS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_ALBUM_TOP_PLAYLISTS_REQUEST};
}

/**
 * Notify the app of a get album top playlists success
 * 
 * @alias module:GetAlbumTopPlaylists
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_ALBUM_TOP_PLAYLISTS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_ALBUM_TOP_PLAYLISTS_SUCCESS};
}

/**
 * Notify the app of a get album top playlists failure
 * 
 * @alias module:GetAlbumTopPlaylists
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the get album top playlists failure
 * 
 * @returns {object}       Redux action with the type of GET_ALBUM_TOP_PLAYLISTS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ALBUM_TOP_PLAYLISTS_FAILURE,
    error,
  };
}