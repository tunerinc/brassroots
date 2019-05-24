'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopChatListenerReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/chat';

/**
 * Confirms the success of stopping the realtime listener for a session's chat
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the chatUnsubscribe function reset
 */
export function success(
  state: State,
): State {
  return updateObject(state, {chatUnsubscribe: null, error: null});
}

/**
 * Adds the error which caused the stop chat listener failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the stop chat listener failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error});
}