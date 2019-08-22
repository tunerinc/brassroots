'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artist top tracks request
 * 
 * @alias module:GetArtistTopTracks
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_TRACKS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_ARTIST_TOP_TRACKS_REQUEST};
}

/**
 * Notify the app of a get artist top tracks success
 * 
 * @alias module:GetArtistTopTracks
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_TRACKS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_ARTIST_TOP_TRACKS_SUCCESS};
}

/**
 * Notify the app of a get artist top tracks failure
 * 
 * @alias module:GetArtistTopTracks
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get artist top tracks failure
 *
 * @returns {object}       Redux action with the type of GET_ARTIST_TOP_TRACKS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_TOP_TRACKS_FAILURE,
    error,
  };
}