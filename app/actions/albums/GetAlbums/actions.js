'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbums
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/albums';

/**
 * Notify the app of a get albums request
 * 
 * @alias module:GetAlbums
 * @function request
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing the albums
 *
 * @returns {object}             Redux action with the type of GET_ALBUMS_REQUEST and whether we are refreshing the albums
 */
export function request(
  refreshing: boolean,
): Action {
  return {
    type: types.GET_ALBUMS_REQUEST,
    refreshing,
  };
}

/**
 * Notify the app of a get albums success
 * 
 * @alias module:GetAlbums
 * @function success
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} albums          The Spotify ids of the albums in the current user's library
 * @param   {number}   total           The total amount of albums in the current user's library
 * @param   {boolean}  [replace=false] Whether the albums need to be replaced
 *
 * @returns {object}                   Redux action with the type of GET_ALBUMS_SUCCESS and the albums to add
 */
export function success(
  albums: Array<string>,
  total: number,
  replace?: boolean = false,
): Action {
  return {
    type: types.GET_ALBUMS_SUCCESS,
    albums,
    total,
    replace,
  };
}

/**
 * Notify the app of a get albums failure
 * 
 * @alias module:GetAlbums
 * @function failure
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get albums failure
 *
 * @returns {object}       Redux action with the type of GET_ALBUMS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ALBUMS_FAILURE,
    error,
  };
}