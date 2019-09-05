'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopQueueListener
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Notify the app of a stop queue listener request
 * 
 * @alias module:StopQueueListener
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of STOP_QUEUE_LISTENER_REQUEST
 */
export function request(): Action {
  return {type: types.STOP_QUEUE_LISTENER_REQUEST};
}

/**
 * Notify the app of a stop queue listener success
 * 
 * @alias module:StopQueueListener
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of STOP_QUEUE_LISTENER_SUCCESS
 */
export function success(): Action {
  return {type: types.STOP_QUEUE_LISTENER_SUCCESS};
}

/**
 * Notify the app of a stop queue listener failure
 * 
 * @alias module:StopQueueListener
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the stop queue listener failure
 * 
 * @return {object}       Redux action with the type of STOP_QUEUE_LISTENER_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.STOP_QUEUE_LISTENER_FAILURE,
    error,
  };
}