'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementAlbumPlays
 */

import * as types from '../types';
import {type Action} from '../../../reducers/albums';

/**
 * Notify the app of a increment album plays request
 * 
 * @alias module:IncrementAlbumPlays
 * @function incrementAlbumPlaysRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_ALBUM_PLAYS_REQUEST
 */
export function incrementAlbumPlaysRequest(): Action {
  return {type: types.INCREMENT_ALBUM_PLAYS_REQUEST};
}

/**
 * Notify the app of a increment album plays success
 * 
 * @alias module:IncrementAlbumPlays
 * @function incrementAlbumPlaysSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_ALBUM_PLAYS_SUCCESS
 */
export function incrementAlbumPlaysSuccess(): Action {
  return {type: types.INCREMENT_ALBUM_PLAYS_SUCCESS};
}

/**
 * Notify the app of a increment album plays failure
 * 
 * @alias module:IncrementAlbumPlays
 * @function incrementAlbumPlaysFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the increment album plays failure
 *
 * @returns {object}       Redux action with the type of INCREMENT_ALBUM_PLAYS_FAILURE and the error which caused the failure
 */
export function incrementAlbumPlaysFailure(
  error: Error,
): Action {
  return {
    type: types.INCREMENT_ALBUM_PLAYS_FAILURE,
    error,
  };
}