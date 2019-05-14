'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetConversationMessageReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleConversation} from '../../../reducers/conversations';
import type {Action, State, SingleConversation} from '../../../reducers/conversations';

/**
 * Sets the message for a single conversation
 * 
 * @function setConversationMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                 The Redux state
 * @param   {object} action                The Redux action
 * @param   {string} action.type           The type of Redux action
 * @param   {string} action.conversationID The Brassroots id of the conversation to set the message for
 * @param   {string} action.message
 * 
 * @returns {object}                       The state with the message set in the single conversation
 */
export function setConversationMessage(
  state: State,
  action: Action,
): State {
  const {conversationID} = action;
  const updates: State = (
    typeof conversationID === 'string'
    && state.conversationsByID
    && state.conversationsByID[conversationID]
  )
    ? {
      conversationsByID: {
        ...state.conversationsByID,
        [conversationID]: singleConversation(state.conversationsByID[conversationID], action),
      },
    }
    : state;

  return updateObject(state, updates);
}

/**
 * Sets the message for a single conversation
 * 
 * @function setMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state                 The Redux state for a single conversation
 * @param   {object}  action                The Redux action
 * @param   {string}  action.type           The type of Redux action
 * @param   {string}  action.conversationID The Brassroots id for the conversation
 * @param   {string}  action.message        The message to set for the conversation
 * 
 * @returns {object}                        The state of the conversation with the message updated  
 */
export function setMessage(
  state: SingleConversation,
  action: Action,
): SingleConversation {
  const {message} = action;
  return updateObject(state, {message});
}