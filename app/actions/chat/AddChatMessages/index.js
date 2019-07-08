'use strict';

/**
 * @module AddChatMessages
 */

import * as types from '../types';
import {
  type Action,
  type ChatMessage,
} from '../../../reducers/chat';

/**
 * Adds message objects from a session's chat
 * 
 * @alias module:AddChatMessages
 * @function addChatMessages
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} messages The message objects from the current session's chat
 * 
 * @returns {object}          Redux action with the type of ADD_CHAT_MESSAGES and the chat message objects
 */
export function addChatMessages(messages) {
  return {
    type: types.ADD_CHAT_MESSAGES,
    messages,
  };
}