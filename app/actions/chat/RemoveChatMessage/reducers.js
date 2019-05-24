'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveChatMessageReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/chat';

/**
 * Removes a chat message from Redux
 * 
 * @function removeChatMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {string} action.chatID The Brassroots id of the chat mesage to remove
 * 
 * @returns {object}               The state with the chat message removed
 */
export function removeChatMessage(
  state: State,
  action: Action,
): State {
  const {currentChat: oldChat, chatByID: oldMessages} = state;
  const {chatID} = action;
  const currentChat = Array.isArray(oldChat) && typeof chatID === 'string'
    ? oldChat.filter(id => id !== chatID)
    : oldChat;

  const updates = Array.isArray(oldChat) && typeof oldMessages === 'object' && currentChat
    ? {
      lastUpdated,
      currentChat,
      chatByID: currentChat.reduce((obj, id) => updateObject(obj, {[id]: oldMessages[id]}), {}),
      totalChatMessages: currentChat.length,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}