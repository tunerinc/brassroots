'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementPlaylistPlays
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Notify the app of a increment playlist plays request
 * 
 * @alias module:IncrementPlaylistPlays
 * @function incrementPlaylistPlaysRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_PLAYLIST_PLAYS_REQUEST
 */
export function incrementPlaylistPlaysRequest(): Action {
  return {
    type: types.INCREMENT_PLAYLIST_PLAYS_REQUEST,
  };
}

/**
 * Notify the app of a increment playlist plays success
 * 
 * @alias module:IncrementPlaylistPlays
 * @function incrementPlaylistPlaysSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} playlistID    The Spotify id of the playlist to increment plays for
 * @param   {number} playlistCount The new total amount of plays the user has for the playlist
 * @param   {string} trackID       The Spotify id of the track to increment plays for within the playlist
 * @param   {number} trackCount    The new total amount of plays the user has for the track in the playlist
 *
 * @returns {object}               Redux action with the type of INCREMENT_PLAYLIST_PLAYS_SUCCESS and the new totals for the playlist/playlist track
 */
export function incrementPlaylistPlaysSuccess(
  playlistID: string,
  playlistCount: number,
  trackID: string,
  trackCount: number,
): Action {
  return {
    type: types.INCREMENT_PLAYLIST_PLAYS_SUCCESS,
    playlistID,
    playlistCount,
    trackID,
    trackCount,
  };
}

/**
 * Notify the app of a increment playlist plays failure
 * 
 * @alias module:IncrementPlaylistPlays
 * @function incrementPlaylistPlaysFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the increment playlist plays failure
 *
 * @returns {object}       Redux action with the type of INCREMENT_PLAYLIST_PLAYS_FAILURE and the error which caused the failure
 */
export function incrementPlaylistPlaysFailure(
  error: Error,
): Action {
  return {
    type: types.INCREMENT_PLAYLIST_PLAYS_FAILURE,
    error,
  };
}