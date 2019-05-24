'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveChatMessage
 */

import * as types from '../types';
import {type Action} from '../../../reducers/chat';

/**
 * Removes a chat message from Redux
 * 
 * @alias module:RemoveChatMessage
 * @function removeChatMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} chatID The Brassroots id of the chat message to remove
 * 
 * @returns {object}        Redux action with the type of REMOVE_CHAT_MESSAGE and the chat message to remove
 */
export function removeChatMessage(
  chatID: string,
): Action {
  return {
    type: types.REMOVE_CHAT_MESSAGE,
    chatID,
  };
}