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
 * @function getPlaylistTopTracksRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_PLAYLIST_TOP_TRACKS_REQUEST
 */
export function getPlaylistTopTracksRequest(): Action {
  return {
    type: types.GET_PLAYLIST_TOP_TRACKS_REQUEST,
  };
}

/**
 * Notify the app of a get playlist top tracks success
 * 
 * @alias module:GetPlaylistTopTracks
 * @function getPlaylistTopTracksSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string}   playlistID The playlist id the top tracks need to be getd from
 * @param   {string[]} topTracks  The Spotify ids of the top 3 most played tracks from the playlist
 *
 * @returns {object}              Redux action with the type of GET_PLAYLIST_TOP_TRACKS_SUCCESS and the top tracks from a playlist
 */
export function getPlaylistTopTracksSuccess(
  playlistID: string,
  topTracks: Array<string>,
): Action {
  return {
    type: types.GET_PLAYLIST_TOP_TRACKS_SUCCESS,
    playlistID,
    topTracks,
  };
}

/**
 * Notify the app of a get playlist top tracks failure
 * 
 * @alias module:GetPlaylistTopTracks
 * @function getPlaylistTopTracksFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get playlist top tracks failure
 *
 * @returns {object}       Redux action with the type of GET_PLAYLIST_TOP_TRACKS_FAILURE and the error which caused the failure
 */
export function getPlaylistTopTracksFailure(
  error: Error,
): Action {
  return {
    type: types.GET_PLAYLIST_TOP_TRACKS_FAILURE,
    error,
  };
}