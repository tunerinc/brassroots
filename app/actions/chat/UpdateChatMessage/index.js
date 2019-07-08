'use strict';

import * as types from '../types';

/**
 * @module UpdateChatMessage
 */

/**
 * Updates a chat message with new information
 * 
 * @alias module:UpdateChatMessage
 * @function updateChatMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} chatID       The Brassroots id of the chat message to update
 * @param   {object} updates      The updates to make to the chat message
 * @param   {string} updates.text The new text to set for the chat message
 * 
 * @returns {object}              Redux action with the type of UPDATE_CHAT_MESSAGE and the updates to make to the chat message
 */
export function updateChatMessage(
  chatID: string,
  updates: {text: string},
): Action {
  return {
    type: types.UPDATE_CHAT_MESSAGE,
    chatID,
    updates,
  };
}