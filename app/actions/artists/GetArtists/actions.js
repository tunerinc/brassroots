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
 * @function getArtistsRequest
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing the artists
 * 
 * @returns {object}             Redux action with the type of GET_ARTISTS_REQUEST and whether the current user is refreshing
 */
export function getArtistsRequest(
  refreshing?: boolean,
): Action {
  return {
    type: types.GET_ARTISTS_REQUEST,
    refreshing,
  };
}

/**
 * Notify the app of a get artists success
 * 
 * @alias GetArtists
 * @function getArtistsSuccess
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} artists The Spotify ids of the artists saved in the current user's library
 * 
 * @returns {object}           Redux action with the type of GET_ARTISTS_SUCCESS and the saved artist ids
 */
export function getArtistsSuccess(
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
 * @function getArtistsFailure
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error} error The error which caused the get artists failure
 * 
 * @returns {object}      Redux action with the type of GET_ARTISTS_FAILURE and the error which caused the failure
 */
export function getArtistsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTISTS_FAILURE,
    error,
  };
}