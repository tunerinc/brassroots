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
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of SEND_CHAT_MESSAGE_REQUEST
 */
export function request(): Action {
  return {type: types.SEND_CHAT_MESSAGE_REQUEST};
}

/**
 * Notify the app of a send chat message success
 * 
 * @alias module:SendChatMessage
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of SEND_CHAT_MESSAGE_SUCCESS
 */
export function success(): Action {
  return {type: types.SEND_CHAT_MESSAGE_SUCCESS};
}

/**
 * Notify the app of a send chat message failure
 * 
 * @alias module:SendChatMessage
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the send chat message failure
 *
 * @return {object}       Redux action with the type of SEND_CHAT_MESSAGE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.SEND_CHAT_MESSAGE_FAILURE,
    error,
  };
}