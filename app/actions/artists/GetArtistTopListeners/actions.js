'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopListeners
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artist top listeners request
 * 
 * @alias module:GetArtistTopListeners
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_LISTENERS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_ARTIST_TOP_LISTENERS_REQUEST};
}

/**
 * Notify the app of a get artist top listeners success
 * 
 * @alias module:GetArtistTopListeners
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_LISTENERS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_ARTIST_TOP_LISTENERS_SUCCESS};
}

/**
 * Notify the app of a get artist top listeners failure
 * 
 * @alias module:GetArtistTopListeners
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get artist top listeners failure
 *
 * @returns {object}       Redux action with the type of GET_ARTIST_TOP_LISTENERS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_TOP_LISTENERS_FAILURE,
    error,
  };
}