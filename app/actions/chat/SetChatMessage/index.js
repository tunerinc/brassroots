'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetChatMessage
 */

import * as types from '../types';
import {type Action} from '../../../reducers/chat';

/**
 * Sets the now playing chat message field
 * 
 * @alias module:SetChatMessage
 * @function setChatMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param {string} message The message the current user has typed in the now playing chat
 *
 * @return {object}        Redux action with the type of SET_CHAT_MESSAGE and the current user's message
 */
export function setChatMessage(
  message: string,
): Action {
  return {
    type: types.SET_CHAT_MESSAGE,
    message,
  };
}
