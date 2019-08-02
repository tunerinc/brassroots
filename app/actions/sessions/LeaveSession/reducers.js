'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module LeaveSessionReducers
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
 * Removes the current user from the session they're leaving
 * 
 * @function leave
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state of the single session
 * 
 * @returns {object}       The state of the single session with the current user removed
 */
export function leave(
  state: Session,
): Session {
  const {totalListeners} = state;
  const updates = typeof totalListeners === 'number'
    ? {
      lastUpdated,
      listeners: [],
      totalListeners: totalListeners - 1,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to leave a user's session
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the leavingSession prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {leavingSession: true, error: null});
}

/**
 * Confirms the success of leaving a user's session
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state            The Redux state
 * @param   {object}  action           The Redux action
 * @param   {string}  action.type      The type of Redux action
 * @param   {string}  action.sessionID The Brassroots id of the session the current user is leaving
 * @param   {boolean} action.isOwner   Whether the current user is the owner of the session
 * 
 * @returns {object}                   The state with the session the current user has left updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {sessionsByID, explore} = state;
  const {sessionID, isOwner} = action;
  const updates = (
    typeof sessionID === 'string'
    && typeof sessionsByID === 'object'
    && typeof explore === 'object'
    && typeof isOwner === 'boolean'
    && Array.isArray(explore.trendingSessions)
  )
    ? {
      currentSessionID: null,
      leavingSession: false,
      error: null,
      explore: updateObject(explore, {
        trendingSessions: isOwner
          ? explore.trendingSessions.filter(id => id !== sessionID)
          : [...explore.trendingSessions],
      }),
      sessionsByID: updateObject(sessionsByID, {
        [sessionID]: singleSession(sessionsByID[sessionID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the leave session failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the leave session failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, leavingSession: false});
}