'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleShuffle
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a toggle shuffle request
 * 
 * @alias module:ToggleShuffle
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of TOGGLE_SHUFFLE_REQUEST
 */
export function request(): Action {
  return {type: types.TOGGLE_SHUFFLE_REQUEST};
}

/**
 * Notify the app of a toggle shuffle success
 * 
 * @alias module:ToggleShuffle
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {boolean} status The new shuffle status for the current user in the session
 *
 * @return {object}         Redux action with the type of TOGGLE_SHUFFLE_SUCCESS and the new shuffle status
 */
export function success(
  status: boolean,
): Action {
  return {
    type: types.TOGGLE_SHUFFLE_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a toggle shuffle failure
 * 
 * @alias module:ToggleShuffle
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the shuffle tracks failure
 *
 * @return {object}       Redux action with the type of TOGGLE_SHUFFLE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.TOGGLE_SHUFFLE_FAILURE,
    error,
  };
}