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
 * @function getAlbumTopPlaylistsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object}         Redux action with the type of GET_ALBUM_TOP_PLAYLISTS_REQUEST
 */
export function getAlbumTopPlaylistsRequest(): Action {
  return {
    type: types.GET_ALBUM_TOP_PLAYLISTS_REQUEST,
  };
}

/**
 * Notify the app of a get album top playlists success
 * 
 * @alias module:GetAlbumTopPlaylists
 * @function getAlbumTopPlaylistsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}   albumID     The Spotify album id to get the top playlists for
 * @param   {string[]} playlistIDs The top playlist ids of the album in order of plays
 * 
 * @returns {object}               Redux action with the type of GET_ALBUM_TOP_PLAYLISTS_SUCCESS and the top playlist ids for the album
 */
export function getAlbumTopPlaylistsSuccess(
  albumID: string,
  playlistIDs: Array<string>,
): Action {
  return {
    type: types.GET_ALBUM_TOP_PLAYLISTS_SUCCESS,
    albumID,
    playlistIDs,
  };
}

/**
 * Notify the app of a get album top playlists failure
 * 
 * @alias module:GetAlbumTopPlaylists
 * @function getAlbumTopPlaylistsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error   The error which caused the get album top playlists failure
 * 
 * @returns {object}         Redux action with the type of GET_ALBUM_TOP_PLAYLISTS_FAILURE and the error which caused the failure
 */
export function getAlbumTopPlaylistsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ALBUM_TOP_PLAYLISTS_FAILURE,
    error,
  };
}