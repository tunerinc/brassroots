'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetChat
 */

import * as types from '../types';
import {type Action} from '../../../reducers/chat';

/**
 * Notify the app of a get chat request
 * 
 * @alias module:GetChat
 * @function getChatRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of GET_CHAT_REQUEST
 */
export function getChatRequest(): Action {
  return {
    type: types.GET_CHAT_REQUEST,
  };
};

/**
 * 
 * 
 * @callback unsubscribe
 */

/**
 * Notify the app of a get chat success
 * 
 * @alias module:GetChat
 * @function getChatSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string[]}    messages    The Brassroots ids of the chat messages from the current session
 * @param  {unsubscribe} unsubscribe The function to invoke to unsubscribe from the chat listener
 *
 * @return {object}                  Redux action with the type of GET_CHAT_SUCCESS, chat message ids, and the unsubscribe function
 */
export function getChatSuccess(
  messages: Array<string>,
  unsubscribe: () => void,
): Action {
  return {
    type: types.GET_CHAT_SUCCESS,
    messages,
    unsubscribe,
  };
}

/**
 * Notify the app of a get chat failure
 * 
 * @alias module:GetChat
 * @function getChatFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the get chat failure
 *
 * @return {object}       Redux action with the type of GET_CHAT_FAILURE and the error which caused the failure
 */
export function getChatFailure(
  error: Error,
): Action {
  return {
    type: types.GET_CHAT_FAILURE,
    error,
  };
}