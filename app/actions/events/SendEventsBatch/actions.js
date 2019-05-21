'use strict';

/**
 * @format
 * @flow
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * @module SendEventsBatch
 */

/**
 * Notify the app of a send events batch request
 * 
 * @alias module:SendEventsBatch
 * @function sendEventsBatchRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of SEND_EVENTS_BATCH_REQUEST
 */
export function sendEventsBatchRequest(): Action {
  return {
    type: types.SEND_EVENTS_BATCH_REQUEST,
  };
}

/**
 * Notify the app of a send events batch success
 * 
 * @alias module:SendEventsBatch
 * @function sendEventsBatchSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of SEND_EVENTS_BATCH_SUCCESS
 */
export function sendEventsBatchSuccess(): Action {
  return {
    type: types.SEND_EVENTS_BATCH_SUCCESS,
  };
}

/**
 * Notify the app of a send events batch failure
 * 
 * @alias module:SendEventsBatch
 * @function sendEventsBatchFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the send events batch failure
 * 
 * @returns {object}       Redux action with the type of SEND_EVENTS_BATCH_FAILURE and the error which caused the failure
 */
export function sendEventsBatchFailure(
  error: Error,
): Action {
  return {
    type: types.SEND_EVENTS_BATCH_FAILURE,
    error,
  };
}