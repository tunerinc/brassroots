'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetSessionQueue
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Notify the app of a get session queue request
 * 
 * @alias module:GetSessionQueue
 * @function getSessionQueueRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of GET_SESSION_QUEUE_REQUEST
 */
export function getSessionQueueRequest(): Action {
  return {
    type: types.GET_SESSION_QUEUE_REQUEST,
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
 * @alias module:GetSessionQueue
 * @function getSessionQueueSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string[]}    queue       The Brassroots ids of the tracks in the queue
 * @param  {unsubscribe} unsubscribe The function to invoke to unsubscribe from the queue listener
 *
 * @return {object}                  Redux action with the type of GET_SESSION_QUEUE_SUCCESS, the queue track ids, and the unsubscribe functions for the listener
 */
export function getSessionQueueSuccess(
  queue: Array<string>,
  unsubscribe: () => Promise<void>,
): Action {
  return {
    type: types.GET_SESSION_QUEUE_SUCCESS,
    queue,
    unsubscribe
  };
}

/**
 * Notify the app of a get session queue failure
 * 
 * @alias module:GetSessionQueue
 * @function getSessionQueueFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the get session queue failure
 *
 * @return {object}       Redux action with the type of GET_SESSION_QUEUE_FAILURE and the error which caused the failure
 */
export function getSessionQueueFailure(
  error: Error,
): Action {
  return {
    type: types.GET_SESSION_QUEUE_FAILURE,
    error,
  };
}