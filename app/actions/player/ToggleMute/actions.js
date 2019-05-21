'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleMute
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a toggle mute request
 * 
 * @alias module:ToggleMute
 * @function toggleMuteRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of TOGGLE_MUTE_REQUEST
 */
export function toggleMuteRequest(): Action {
  return {
    type: types.TOGGLE_MUTE_REQUEST,
  };
}

/**
 * Notify the app of a toggle mute success
 * 
 * @alias module:ToggleMute
 * @function toggleMuteSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {boolean} status The new mute status for the current user in the session
 *
 * @return {object}         Redux action with the type of TOGGLE_MUTE_SUCCESS and the new mute status
 */
export function toggleMuteSuccess(
  status: boolean,
): Action {
  return {
    type: types.TOGGLE_MUTE_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a toggle mute failure
 * 
 * @alias module:ToggleMute
 * @function toggleMuteFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the toggle mute failure
 *
 * @return {object}       Redux action with the type of TOGGLE_MUTE_FAILURE and the error which caused the failure
 */
export function toggleMuteFailure(
  error: Error,
): Action {
  return {
    type: types.TOGGLE_MUTE_FAILURE,
    error,
  };
}