'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopSessionInfoListener
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a stop session info listener request
 * 
 * @alias module:StopSessionInfoListener
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of STOP_SESSION_INFO_LISTENER_REQUEST
 */
export function request(): Action {
  return {type: types.STOP_SESSION_INFO_LISTENER_REQUEST};
}

/**
 * Notify the app of a stop session info listener success
 * 
 * @alias module:StopSessionInfoListener
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of STOP_SESSION_INFO_LISTENER_SUCCESS
 */
export function success(): Action {
  return {type: types.STOP_SESSION_INFO_LISTENER_SUCCESS};
}

/**
 * Notify the app of a stop session info listener failure
 * 
 * @alias module:StopSessionInfoListener
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the stop session info listener failure
 * 
 * @return {object}       Redux action with the type of STOP_SESSION_INFO_LISTENER_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.STOP_SESSION_INFO_LISTENER_FAILURE,
    error,
  };
}