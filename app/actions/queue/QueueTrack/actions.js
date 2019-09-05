'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module QueueTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Notify the app of a queue track request
 * 
 * @alias module:QueueTrack
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of QUEUE_TRACK_REQUEST
 */
export function request(): Action {
  return {type: types.QUEUE_TRACK_REQUEST};
}

/**
 * Notify the app of a queue track success
 * 
 * @alias module:QueueTrack
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of QUEUE_TRACK_SUCCESS
 */
export function success(): Action {
  return {type: types.QUEUE_TRACK_SUCCESS};
}

/**
 * Notify the app of a queue track failure
 * 
 * @alias module:QueueTrack
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the queue track failure
 *
 * @return {object}       Redux action with the type of QUEUE_TRACK_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.QUEUE_TRACK_FAILURE,
    error,
  };
}