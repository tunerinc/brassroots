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
 * @function getAlbumsRequest
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing the albums
 *
 * @returns {object}             Redux action with the type of GET_ALBUMS_REQUEST and whether we are refreshing the albums
 */
export function getAlbumsRequest(
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
 * @function getAlbumsSuccess
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} albums The Spotify ids of the albums in the current user's library
 *
 * @returns {object}          Redux action with the type of GET_ALBUMS_SUCCESS and the albums to add
 */
export function getAlbumsSuccess(
  albums: Array<string>,
): Action {
  return {
    type: types.GET_ALBUMS_SUCCESS,
    albums,
  };
}

/**
 * Notify the app of a get albums failure
 * 
 * @alias module:GetAlbums
 * @function getAlbumsFailure
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get albums failure
 *
 * @returns {object}       Redux action with the type of GET_ALBUMS_FAILURE and the error which caused the failure
 */
export function getAlbumsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ALBUMS_FAILURE,
    error,
  };
}