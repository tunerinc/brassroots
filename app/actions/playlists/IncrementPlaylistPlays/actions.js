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
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_PLAYLIST_PLAYS_REQUEST
 */
export function request(): Action {
  return {type: types.INCREMENT_PLAYLIST_PLAYS_REQUEST};
}

/**
 * Notify the app of a increment playlist plays success
 * 
 * @alias module:IncrementPlaylistPlays
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_PLAYLIST_PLAYS_SUCCESS
 */
export function success(): Action {
  return {type: types.INCREMENT_PLAYLIST_PLAYS_SUCCESS};
}

/**
 * Notify the app of a increment playlist plays failure
 * 
 * @alias module:IncrementPlaylistPlays
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the increment playlist plays failure
 *
 * @returns {object}       Redux action with the type of INCREMENT_PLAYLIST_PLAYS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.INCREMENT_PLAYLIST_PLAYS_FAILURE,
    error,
  };
}