'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module InitializeSpotify
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a initialize spotify request
 * 
 * @alias module:InitializeSpotify
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of INITIALIZE_SPOTIFY_REQUEST
 */
export function request(): Action {
  return {type: types.INITIALIZE_SPOTIFY_REQUEST};
}

/**
 * Notify the app of a initialize spotify success
 * 
 * @alias module:InitializeSpotify
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} loggedIn Whether the current user is logged in or not
 * 
 * @returns {object}           Redux action with the type of INITIALIZE_SPOTIFY_SUCCESS and the logged in status
 */
export function success(
  loggedIn: boolean,
): Action {
  return {
    type: types.INITIALIZE_SPOTIFY_SUCCESS,
    loggedIn,
  };
}

/**
 * Notify the app of a initialize spotify failure
 * 
 * @alias module:InitializeSpotify
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the initialize spotify failure
 * 
 * @returns {object}       Redux action with the type of INITIALIZE_SPOTIFY_FAILURE and the error which caused the failure
*/
export function failure(
  error: Error,
): Action {
  return {
    type: types.INITIALIZE_SPOTIFY_FAILURE,
    error,
  };
}
