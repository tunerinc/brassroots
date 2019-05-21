'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/albums';

/**
 * Notify the app of a get album top tracks request
 * 
 * @alias module:GetAlbumTopTracks
 * @function getAlbumTopTracksRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ALBUM_TOP_TRACKS_REQUEST
 */
export function getAlbumTopTracksRequest(): Action {
  return {
    type: types.GET_ALBUM_TOP_TRACKS_REQUEST,
  };
}

/**
 * Notify the app of a get album top tracks success
 * 
 * @alias module:GetAlbumTopTracks
 * @function getAlbumTopTracksSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} albumID  The album id to get the top songs of
 * @param   {array}  trackIDs The top 3 most played tracks from the album
 *
 * @returns {object}          Redux action with the type of GET_ALBUM_TOP_TRACKS_SUCCESS and the top album tracks
 */
export function getAlbumTopTracksSuccess(
  albumID: string,
  trackIDs: Array<string>,
): Action {
  return {
    type: types.GET_ALBUM_TOP_TRACKS_SUCCESS,
    albumID,
    trackIDs,
  };
}

/**
 * Notify the app of a get album top tracks failure
 * 
 * @alias module:GetAlbumTopTracks
 * @function getAlbumTopTracksFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get album top tracks failure
 *
 * @returns {object}       Redux action with the type of GET_ALBUM_TOP_TRACKS_FAILURE and the error which caused the failure
 */
export function getAlbumTopTracksFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ALBUM_TOP_TRACKS_FAILURE,
    error,
  };
}