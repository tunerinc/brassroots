'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateChatMessage
 */

import updateObject from '../../../utils/updateObject';
import {
  singleChat,
  lastUpdated,
  type ChatMessage,
  type Action,
  type State,
} from '../../../reducers/chat';

/**
 * Updates a single chat message with new information
 * 
 * @function updateSingleMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state               The Redux state
 * @param   {object} action              The Redux action
 * @param   {string} action.type         The type of Redux action
 * @param   {string} action.chatID       The Brassroots id of the chat message to update
 * @param   {object} action.updates      The updates to make to the chat message
 * @param   {string} action.updates.text The text to update the chat message with
 * 
 * @returns {object}                     The state of the single chat message with the updated information
 */
export function updateSingleMessage(
  state: ChatMessage,
  action: Action,
): ChatMessage {
  const {updates: changes} = action;
  const updates = typeof changes === 'object' && typeof changes.text === 'string'
    ? {...changes, error: null}
    : {};

  return updateObject(state, updates);
}

/**
 * Updates a single chat message with new information
 * 
 * @function updateChatMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state               The Redux state
 * @param   {object} action              The Redux action
 * @param   {string} action.type         The type of Redux action
 * @param   {string} action.chatID       The Brassroots id of the chat message to update
 * @param   {object} action.updates      The updates to make to the chat message
 * @param   {string} action.updates.text The text to update the chat message with
 * 
 * @returns {object}                     The state with the chat message updated
 */
export function updateChatMessage(
  state: State,
  action: Action,
): State {
  const {chatByID: oldChat} = state;
  const {chatID} = action;
  const updates = typeof chatID === 'string' && typeof oldChat === 'object'
    ? {
      lastUpdated,
      error: null,
      chatByID: updateObject(oldChat, {
        [chatID]: singleChat(oldChat[chatID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}