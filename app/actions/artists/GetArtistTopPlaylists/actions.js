'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopPlaylists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artist top playlists request
 * 
 * @alias module:GetArtistTopPlaylists
 * @function getArtistTopPlaylistsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_PLAYLISTS_REQUEST
 */
export function getArtistTopPlaylistsRequest(): Action {
  return {
    type: types.GET_ARTIST_TOP_PLAYLISTS_REQUEST,
  };
}

/**
 * Notify the app of a get artist top playlists success
 * 
 * @alias module:GetArtistTopPlaylists
 * @function getArtistTopPlaylistsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}   artistID    The Spotify artist id to get the top playlists for
 * @param   {string[]} playlistIDs The top playlist ids of the artist in order of plays
 * 
 * @returns {object}               Redux action with the type of GET_ARTIST_TOP_PLAYLISTS_SUCCESS and the top playlist ids for the artist
 */
export function getArtistTopPlaylistsSuccess(
  artistID: string,
  playlistIDs: Array<string>,
): Action {
  return {
    type: types.GET_ARTIST_TOP_PLAYLISTS_SUCCESS,
    artistID,
    playlistIDs,
  };
}

/**
 * Notify the app of a get artist top playlists failure
 * 
 * @alias module:GetArtistTopPlaylists
 * @function getArtistTopPlaylistsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error    The error which caused the get artist top playlists failure
 * 
 * @returns {object}          Redux action with the type of GET_ARTIST_TOP_PLAYLISTS_FAILURE and the error which caused the failure for the artist
 */
export function getArtistTopPlaylistsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_TOP_PLAYLISTS_FAILURE,
    error,
  };
}