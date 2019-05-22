'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetChatReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/chat';

/**
 * Starts the request to get the messages from the session's chat
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingChat prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingChat: true, error: null});
}

/**
 * Confirms the success of getting the chat messages of a session
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}    state              The Redux state
 * @param   {object}    action             The Redux action
 * @param   {string}    action.type        The type of Redux action
 * @param   {string[]}  action.messages    The Brassroots ids of the chat messages from the current session
 * @param   {chatUnsub} action.unsubscribe The function to invoke to unsubscribe the chat listener
 * 
 * @returns {object}                       The state with the chat message ids added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {messages, unsubscribe: chatUnsubscribe} = action;
  const updates = Array.isArray(messages) && typeof chatUnsubscribe === 'function'
    ? {
      lastUpdated,
      chatUnsubscribe,
      currentChat: messages.reverse(),
      fetchingChat: false,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get chat messages failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get chat messages failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingChat: false});
}