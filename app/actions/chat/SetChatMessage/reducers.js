'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetChatMessageReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/chat';

/**
 * Sets the message for the chat of the current session
 * 
 * @function setChatMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.message The new message to set in the chat
 * 
 * @returns {object}                The state with the new message set from the current user
 */
export function setChatMessage(
  state: State,
  action: Action,
): State {
  const {message} = action;
  const updates = typeof message === 'string' ? {message} : {};
  return updateObject(state, updates);
}