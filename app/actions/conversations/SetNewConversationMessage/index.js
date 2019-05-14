'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewConversationMessage
 */

import * as types from '../types';
import type {Action} from '../../../reducers/conversations';

/**
 * Sets the message for the new conversation being created by the current user
 * 
 * @alias module:SetNewConversationMessage
 * @function setNewConversationMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} message The message to set for the new conversation
 * 
 * @returns {object}         Redux action with the type of SET_NEW_CONVERSATION_MESSAGE and the message to set
 */
export function setNewConversationMessage(
  message: string,
): Action {
  return {
    type: types.SET_NEW_CONVERSATION_MESSAGE,
    message,
  };
}