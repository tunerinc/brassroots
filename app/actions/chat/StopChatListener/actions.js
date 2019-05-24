'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopChatListener
 */

import * as types from '../types';
import {type Action} from '../../../reducers/chat';

/**
 * Notify the app of a stop chat listener request
 * 
 * @alias module:StopChatListener
 * @function stopChatListenerRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of STOP_CHAT_LISTENER_REQUEST
 */
export function stopChatListenerRequest(): Action {
  return {
    type: types.STOP_CHAT_LISTENER_REQUEST,
  };
}

/**
 * Notify the app of a stop chat listener success
 * 
 * @alias module:StopChatListener
 * @function stopChatListenerSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of STOP_CHAT_LISTENER_SUCCESS
 */
export function stopChatListenerSuccess(): Action {
  return {
    type: types.STOP_CHAT_LISTENER_SUCCESS,
  };
}

/**
 * Notify the app of a stop chat listener failure
 * 
 * @alias module:StopChatListener
 * @function stopChatListenerFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the stop chat listener failure
 * 
 * @returns {object}       Redux action with the type of STOP_CHAT_LISTENER_FAILURE and the error which caused the failure
 */
export function stopChatListenerFailure(
  error: Error,
): Action {
  return {
    type: types.STOP_CHAT_LISTENER_FAILURE,
    error,
  };
}