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
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_CONTEXT_QUEUE_REQUEST
 */
export function request(): Action {
  return {type: types.GET_CONTEXT_QUEUE_REQUEST};
}

/**
 * Notify the app of a get context queue success
 * 
 * @alias module:GetContextQueue
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_CONTEXT_QUEUE_SUCCESS
 */
export function success(): Action {
  return {type: types.GET_CONTEXT_QUEUE_SUCCESS};
}

/**
 * Notify the app of a get context queue failure
 * 
 * @alias module:GetContextQueue
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the get context queue failure
 * 
 * @returns {object}       Redux action with the type of GET_CONTEXT_QUEUE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_CONTEXT_QUEUE_FAILURE,
    error,
  };
}