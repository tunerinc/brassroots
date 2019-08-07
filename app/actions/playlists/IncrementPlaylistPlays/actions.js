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
  return {type: types.INCREMENT_PLAYLIST_PLAYS_REQUEST};
}

/**
 * Notify the app of a increment playlist plays success
 * 
 * @alias module:IncrementPlaylistPlays
 * @function incrementPlaylistPlaysSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_PLAYLIST_PLAYS_SUCCESS
 */
export function incrementPlaylistPlaysSuccess(): Action {
  return {type: types.INCREMENT_PLAYLIST_PLAYS_SUCCESS};
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