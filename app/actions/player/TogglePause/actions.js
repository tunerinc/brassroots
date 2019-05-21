'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module TogglePause
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a toggle pause track request
 * 
 * @alias module:TogglePause
 * @function togglePauseRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of TOGGLE_PAUSE_REQUEST
 */
export function togglePauseRequest(): Action {
  return {
    type: types.TOGGLE_PAUSE_REQUEST,
  };
}

/**
 * Notify the app of a toggle pause track success
 * 
 * @alias module:TogglePause
 * @function togglePauseSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {boolean} status   The new pause status for the current user in the now playing session
 * @param  {number}  progress The current track progress in milliseconds
 *
 * @return {object}           Redux action with the type of TOGGLE_PAUSE_SUCCESS and the new pause status with the progress
 */
export function togglePauseSuccess(
  status: boolean,
  progress: number,
): Action {
  return {
    type: types.TOGGLE_PAUSE_SUCCESS,
    status,
    progress,
  };
}

/**
 * Notify the app of a toggle pause track failure
 * 
 * @alias module:TogglePause
 * @function togglePauseFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the toggle pause track failure
 *
 * @return {object}       Redux action with the type of TOGGLE_PAUSE_FAILURE and the error which caused the failure
 */
export function togglePauseFailure(
  error: Error,
): Action {
  return {
    type: types.TOGGLE_PAUSE_FAILURE,
    error,
  };
}