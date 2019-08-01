'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module JoinSessionReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleSession,
  type Action,
  type State,
  type Session,
} from '../../../reducers/sessions';

/**
 * Join a single session as a listener
 * 
 * @function join
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                 The Redux state of a single session
 * @param   {object} action                The Redux action
 * @param   {string} action.type           The type of Redux action
 * @param   {string} action.sessionID      The Brassroots id of the session the current user has joined
 * @param   {string} action.userID         The Brassroots id of the current user
 * @param   {number} action.totalListeners The new total amount of listeners after the current user has joined
 * 
 * @returns {object}                       The state of the single session with the current user added as a listener
 */
export function join(
  state: Session,
  action: Action,
): Session {
  const {listeners} = state;
  const {userID, totalListeners} = action;
  const updates = (
    typeof userID === 'string'
    && typeof totalListeners === 'number'
    && Array.isArray(listeners)
  )
    ? {
      totalListeners,
      listeners: listeners.concat(userID),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to join a user's session
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
 * Confirms the success of joining a user's session
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                 The Redux state
 * @param   {object} action                The Redux action
 * @param   {string} action.type           The type of Redux action
 * @param   {string} action.sessionID      The Brassroots id of the session the current user has joined
 * @param   {string} action.userID         The Brassroots id of the current user
 * @param   {number} action.totalListeners The new total amount of listeners after the current user has joined
 * 
 * @returns {object}                       The state with the current user joined as a listener
 */
export function success(
  state: State,
  action: Action,
): State {
  const {sessionsByID} = state;
  const {sessionID: currentSessionID} = action;
  const updates = typeof currentSessionID === 'string' && typeof sessionsByID === 'object'
    ? {
      currentSessionID,
      joiningSession: false,
      error: null,
      sessionsByID: updateObject(sessionsByID, {
        [currentSessionID]: singleSession(sessionsByID[currentSessionID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the join session failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the join session failure
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