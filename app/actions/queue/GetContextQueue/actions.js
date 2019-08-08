'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetContextQueue
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Notify the app of a get context queue request
 * 
 * @alias module:GetContextQueue
 * @function getContextQueueRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_CONTEXT_QUEUE_REQUEST
 */
export function getContextQueueRequest(): Action {
  return {type: types.GET_CONTEXT_QUEUE_REQUEST};
}

/**
 * Notify the app of a get context queue success
 * 
 * @alias module:GetContextQueue
 * @function getContextQueueSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string[]} [contextQueue=[]] The Spotify ids of the context queue tracks
 * 
 * @returns {object}                     Redux action with the type of GET_CONTEXT_QUEUE_SUCCESS and the context queue
 */
export function getContextQueueSuccess(
  contextQueue: Array<string> = [],
): Action {
  return {
    type: types.GET_CONTEXT_QUEUE_SUCCESS,
    contextQueue,
  };
}

/**
 * Notify the app of a get context queue failure
 * 
 * @alias module:GetContextQueue
 * @function getContextQueueFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the get context queue failure
 * 
 * @returns {object}       Redux action with the type of GET_CONTEXT_QUEUE_FAILURE and the error which caused the failure
 */
export function getContextQueueFailure(
  error: Error,
): Action {
  return {
    type: types.GET_CONTEXT_QUEUE_FAILURE,
    error,
  };
}