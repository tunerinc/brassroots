'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SendChatMessageReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/chat';

/**
 * Starts the request to send a chat message in a session
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the sendingMessage prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {sendingMessage: true, error: null});
}

/**
 * Confirms the success of sending a chat message in a session
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the message cleared inside of the session
 */
export function success(
  state: State,
): State {
  return updateObject(state, {message: '', sendingMessage: false, error: null});
}

/**
 * Adds the error which caused the send session message failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the send session message failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, sendingMessage: false});
}