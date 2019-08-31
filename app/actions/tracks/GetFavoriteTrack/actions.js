'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetFavoriteTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a get favorite track request
 * 
 * @alias module:GetFavoriteTrack
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_FAVORITE_TRACK_REQUEST
 */
export function request(): Action {
  return {type: types.GET_FAVORITE_TRACK_REQUEST};
}

/**
 * Notify the app of a get favorite track success
 * 
 * @alias module:GetFavoriteTrack
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object}       Redux action with the type of GET_FAVORITE_TRACK_SUCCESS and the favorite track
 */
export function success(): Action {
  return {type: types.GET_FAVORITE_TRACK_SUCCESS};
}

/**
 * Notify the app  of a get favorite track failure
 * 
 * @alias module:GetFavoriteTrack
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get favorite track failure
 *
 * @returns {object}       Redux action with the type of GET_FAVORITE_TRACK_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_FAVORITE_TRACK_FAILURE,
    error,
  };
}