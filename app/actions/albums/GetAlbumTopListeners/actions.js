'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopListeners
 */

import * as types from '../types';
import {type Action} from '../../../reducers/albums';

/**
 * Notify the app of a get album top listeners request
 * 
 * @alias module:GetAlbumTopListeners
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ALBUM_TOP_LISTENERS_REQUEST
 */
export function request(): Action {
  return {type: types.GET_ALBUM_TOP_LISTENERS_REQUEST};
}

/**
 * Notify the app of a get album top listeners success
 * 
 * @alias module:GetAlbumTopListeners
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ALBUM_TOP_LISTENERS_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_ALBUM_TOP_LISTENERS_SUCCESS};
}

/**
 * Notify the app of a get album top listeners failure
 * 
 * @alias module:GetAlbumTopListeners
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get album top listeners failure
 *
 * @returns {object}       Redux action with the type of GET_ALBUM_TOP_LISTENERS_FAILURE and the error which caused the failure.
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ALBUM_TOP_LISTENERS_FAILURE,
    error,
  };
}