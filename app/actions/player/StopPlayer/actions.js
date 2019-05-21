'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopPlayer
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a stop player request
 * 
 * @alias module:StopPlayer
 * @function stopPlayerRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of STOP_PLAYER_REQUEST
 */
export function stopPlayerRequest(): Action {
  return {
    type: types.STOP_PLAYER_REQUEST,
  };
}

/**
 * Notify the app of a stop player success
 * 
 * @alias module:StopPlayer
 * @function stopPlayerSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of STOP_PLAYER_SUCCESS
 */
export function stopPlayerSuccess(): Action {
  return {
    type: types.STOP_PLAYER_SUCCESS,
  };
}

/**
 * Notify the app of a stop player failure
 * 
 * @alias module:StopPlayer
 * @function stopPlayerFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error     The error which caused the stop player failure
 * 
 * @return {object}           Redux action with the type of STOP_PLAYER_FAILURE and the error which caused the failure
 */
export function stopPlayerFailure(
  error: Error,
): Action {
  return {
    type: types.STOP_PLAYER_FAILURE,
    error,
  };
}