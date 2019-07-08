'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SendChatMessage
 */

import * as types from '../types';
import {type Action} from '../../../reducers/chat';

/**
 * Notify the app of a send chat message request
 * 
 * @alias module:SendChatMessage
 * @function sendChatMessageRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of SEND_CHAT_MESSAGE_REQUEST
 */
export function sendChatMessageRequest(): Action {
  return {
    type: types.SEND_CHAT_MESSAGE_REQUEST,
  };
}

/**
 * Notify the app of a send chat message success
 * 
 * @alias module:SendChatMessage
 * @function sendChatMessageSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of SEND_CHAT_MESSAGE_SUCCESS
 */
export function sendChatMessageSuccess(): Action {
  return {
    type: types.SEND_CHAT_MESSAGE_SUCCESS,
  };
}

/**
 * Notify the app of a send chat message failure
 * 
 * @alias module:SendChatMessage
 * @function sendChatMessageFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the send chat message failure
 *
 * @return {object}       Redux action with the type of SEND_CHAT_MESSAGE_FAILURE and the error which caused the failure
 */
export function sendChatMessageFailure(
  error: Error,
): Action {
  return {
    type: types.SEND_CHAT_MESSAGE_FAILURE,
    error,
  };
}