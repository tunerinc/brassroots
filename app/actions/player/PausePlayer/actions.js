'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PausePlayer
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a pause player request
 * 
 * @alias module:PausePlayer
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of PAUSE_PLAYER_REQUEST
 */
export function request(): Action {
  return {type: types.PAUSE_PLAYER_REQUEST};
}

/**
 * Notify the app of a pause player success
 * 
 * @alias module:PausePlayer
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of PAUSE_PLAYER_SUCCESS
 */
export function success(): Action {
  return {type: types.PAUSE_PLAYER_SUCCESS};
}

/**
 * Notify the app of a pause player failure
 * 
 * @alias module:PausePlayer
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the pause player failure
 * 
 * @return {object}       Redux action with the type of PAUSE_PLAYER_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.PAUSE_PLAYER_FAILURE,
    error,
  };
}