'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionMode
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a change session mode request
 * 
 * @alias module:ChangeSessionMode
 * @function changeSessionModeRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_SESSION_MODE_REQUEST
 */
export function changeSessionModeRequest(): Action {
  return {
    type: types.CHANGE_SESSION_MODE_REQUEST,
  };
}

/**
 * Notify the app of a change session mode success
 * 
 * @alias module:ChangeSessionMode
 * @function changeSessionModeSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_SESSION_MODE_SUCCESS
 */
export function changeSessionModeSuccess(): Action {
  return {
    type: types.CHANGE_SESSION_MODE_SUCCESS,
  };
}

/**
 * Notify the app of a change session mode failure
 * 
 * @alias module:ChangeSessionMode
 * @function changeSessionModeFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change session mode failure
 *
 * @returns {object}       Redux action with the type of CHANGE_SESSION_MODE_FAILURE and the error which caused the failure
 */
export function changeSessionModeFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_SESSION_MODE_FAILURE,
    error,
  };
}