'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopAlbums
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artist top albums request
 * 
 * @alias module:GetArtistTopAlbums
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_ALBUMS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_ARTIST_TOP_ALBUMS_REQUEST};
}

/**
 * Notify the app of a get artist top albums success
 * 
 * @alias module:GetArtistTopAlbums
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_ALBUMS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_ARTIST_TOP_ALBUMS_SUCCESS};
}

/**
 * Notify the app of a get artist top albums failure
 * 
 * @alias module:GetArtistTopAlbums
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the get artist top albums failure
 * 
 * @returns {object}       Redux action with the type of GET_ARTIST_TOP_ALBUMS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_TOP_ALBUMS_FAILURE,
    error,
  };
}