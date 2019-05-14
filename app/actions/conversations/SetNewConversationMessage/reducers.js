'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewConversationMessageReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/conversations';

/**
 * Sets the mesasge for the new conversation
 * 
 * @function setNewConversationMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.message The message to set for the new conversation
 * 
 * @returns {object}                The state with the message set for the new conversation
 */
export function setNewConversationMessage(
  state: State,
  action: Action,
): State {
  const {message} = action;
  const updates = state.newConversation
    ? {
      newConversation: {
        ...state.newConversation,
        message,
      },
    }
    : state;

  return updateObject(state, updates);
}