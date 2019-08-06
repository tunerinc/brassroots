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
 * @function getAlbumTopListenersRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ALBUM_TOP_LISTENERS_REQUEST
 */
export function getAlbumTopListenersRequest(): Action {
  return {type: types.GET_ALBUM_TOP_LISTENERS_REQUEST};
}

/**
 * Notify the app of a get album top listeners success
 * 
 * @alias module:GetAlbumTopListeners
 * @function getAlbumTopListenersSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ALBUM_TOP_LISTENERS_SUCCESS
 */
export function getAlbumTopListenersSuccess(): Action {
  return {type: types.GET_ALBUM_TOP_LISTENERS_SUCCESS};
}

/**
 * Notify the app of a get album top listeners failure
 * 
 * @alias module:GetAlbumTopListeners
 * @function getAlbumTopListenersFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get album top listeners failure
 *
 * @returns {object}       Redux action with the type of GET_ALBUM_TOP_LISTENERS_FAILURE and the error which caused the failure.
 */
export function getAlbumTopListenersFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ALBUM_TOP_LISTENERS_FAILURE,
    error,
  };
}