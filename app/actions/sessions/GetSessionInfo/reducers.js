'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetSessionInfoReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleSession,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to open the realtime connection for session info
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingInfo prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingInfo: true, error: null});
}

/**
 * Confirms the success of the listener starting for the session info
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}    state              The Redux state
 * @param   {object}    action             The Redux action
 * @param   {string}    action.type        The type of Redux action
 * @param   {infoUnsub} action.unsubscribe The function to invoke to unsubscribe the chat listener
 * 
 * @returns {object}                       The state with the unsubscribe method added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {unsubscribe: infoUnsubscribe} = action;
  return updateObject(state, {lastUpdated, infoUnsubscribe, fetchingInfo: false, error: null});
}

/**
 * Adds the error which caused the get session info failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get session info failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingInfo: false, infoUnsubscribe: null});
}