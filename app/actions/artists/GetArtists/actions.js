'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artists request
 * 
 * @alias GetArtists
 * @function request
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_ARTISTS_REQUEST
 */
export function request(
  refreshing?: boolean,
): Action {
  return {type: types.GET_ARTISTS_REQUEST};
}

/**
 * Notify the app of a get artists success
 * 
 * @alias GetArtists
 * @function success
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} artists The Spotify ids of the artists saved in the current user's library
 * 
 * @returns {object}           Redux action with the type of GET_ARTISTS_SUCCESS and the saved artist ids
 */
export function success(
  artists: Array<string>,
): Action {
  return {
    type: types.GET_ARTISTS_SUCCESS,
    artists,
  };
}

/**
 * Notify the app of a get artists failure
 * 
 * @alias GetArtists
 * @function failure
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error} error The error which caused the get artists failure
 * 
 * @returns {object}      Redux action with the type of GET_ARTISTS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTISTS_FAILURE,
    error,
  };
}