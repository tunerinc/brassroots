'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StartPlayer
 */

import * as types from '../types';
import type {Action} from '../../../reducers/player';

/**
 * Notify the app of a start player request
 * 
 * @alias module:StartPlayer
 * @function startPlayerRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of START_PLAYER_REQUEST
 */
export function startPlayerRequest(): Action {
  return {
    type: types.START_PLAYER_REQUEST,
  };
}

/**
 * Notify the app of a start player success
 * 
 * @alias module:StartPlayer
 * @function startPlayerSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of START_PLAYER_SUCCESS
 */
export function startPlayerSuccess(): Action {
  return {
    type: types.START_PLAYER_SUCCESS,
  };
}

/**
 * Notify the app of a start player failure
 * 
 * @alias module:StartPlayer
 * @function startPlayerFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the start player failure
 * 
 * @return {object}       Redux action with the type of START_PLAYER_FAILURE and the error which caused the failure
 */
export function startPlayerFailure(
  error: Error,
): Action {
  return {
    type: types.START_PLAYER_FAILURE,
    error,
  };
}