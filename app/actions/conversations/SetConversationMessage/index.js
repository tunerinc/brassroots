'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetConversationMessage
 */

import * as types from '../types';
import type {Action} from '../../../reducers/conversations';

/**
 * Sets the message the user is typing in a conversation
 * 
 * @alias module:SetConversationMessage
 * @function setConversationMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} conversationID The conversation id to set the message in
 * @param   {string} message        The message the user has typed in
 *
 * @returns {object}                Redux action with the type of SET_CONVERSATION_MESSAGE and the message the user has typed
 */
export function setConversationMessage(
  conversationID: string,
  message: string,
): Action {
  return {
    type: types.SET_CONVERSATION_MESSAGE,
    conversationID,
    message,
  };
}
