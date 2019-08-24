'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleRepeat
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a toggle repeat request
 * 
 * @alias module:ToggleRepeat
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of TOGGLE_REPEAT_REQUEST
 */
export function request(): Action {
  return {type: types.TOGGLE_REPEAT_REQUEST};
}

/**
 * Notify the app of a toggle repeat success
 * 
 * @alias module:ToggleRepeat
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {boolean} status The new repeat status for the current user in the session
 *
 * @return {object}         Redux action with the type of TOGGLE_REPEAT_SUCCESS and the new repeat status
 */
export function success(
  status: boolean,
): Action {
  return {
    type: types.TOGGLE_REPEAT_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a toggle repeat failure
 * 
 * @alias module:ToggleRepeat
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the repeat tracks failure
 *
 * @return {object}       Redux action with the type of TOGGLE_REPEAT_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.TOGGLE_REPEAT_FAILURE,
    error,
  };
}