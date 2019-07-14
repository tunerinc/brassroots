'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserQueue
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Notify the app of a get session queue request
 * 
 * @alias module:GetUserQueue
 * @function getUserQueueRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of GET_USER_QUEUE_REQUEST
 */
export function getUserQueueRequest(): Action {
  return {
    type: types.GET_USER_QUEUE_REQUEST,
  };
}

/**
 * 
 * 
 * @callback unsubscribe
 */

/**
 * Notify the app of a get session queue success
 * 
 * @alias module:GetUserQueue
 * @function getUserQueueSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string[]}    queue       The Brassroots ids of the tracks in the queue
 * @param  {unsubscribe} unsubscribe The function to invoke to unsubscribe from the queue listener
 *
 * @return {object}                  Redux action with the type of GET_USER_QUEUE_SUCCESS, the queue track ids, and the unsubscribe functions for the listener
 */
export function getUserQueueSuccess(
  queue: Array<string>,
  unsubscribe: () => void,
): Action {
  return {
    type: types.GET_USER_QUEUE_SUCCESS,
    queue,
    unsubscribe,
  };
}

/**
 * Notify the app of a get session queue failure
 * 
 * @alias module:GetUserQueue
 * @function getUserQueueFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the get session queue failure
 *
 * @return {object}       Redux action with the type of GET_USER_QUEUE_FAILURE and the error which caused the failure
 */
export function getUserQueueFailure(
  error: Error,
): Action {
  return {
    type: types.GET_USER_QUEUE_FAILURE,
    error,
  };
}