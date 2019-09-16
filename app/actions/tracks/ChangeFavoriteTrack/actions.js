'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeFavoriteTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a change favorite track request
 * 
 * @alias module:ChangeFavoriteTrack
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of CHANGE_FAVORITE_TRACK_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_FAVORITE_TRACK_REQUEST};
}

/**
 * Notify the app of a change favorite track success
 * 
 * @alias module:ChangeFavoriteTrack
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of CHANGE_FAVORITE_TRACK_SUCCESS
 */
export function success(): Action {
  return {type: types.CHANGE_FAVORITE_TRACK_SUCCESS};
}

/**
 * Notify the app of a change favorite track failure
 * 
 * @alias module:ChangeFavoriteTrack
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the change favorite track failure
 * 
 * @returns {object}       Redux action with the type of CHANGE_FAVORITE_TRACK_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_FAVORITE_TRACK_FAILURE,
    error,
  };
}