'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateSessionReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleSession,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to create a session for the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the joiningSession prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {joiningSession: true, error: null});
}

/**
 * Confirms the success of creating a session for the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state            The Redux state
 * @param   {object} action           The Redux action
 * @param   {string} action.type      The type of Redux action
 * @param   {string} action.sessionID The Brassroots id of the created session
 * 
 * @returns {object}                  The state with the created session added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {sessionID: currentSessionID} = action;
  const updates = typeof currentSessionID === 'string'
    ? {
      lastUpdated,
      currentSessionID,
      joiningSession: false,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the create session failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the create session failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, joiningSession: false});
}