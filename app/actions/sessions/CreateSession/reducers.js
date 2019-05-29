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
 * @param   {object}   state                         The Redux state
 * @param   {object}   action                        The Redux action
 * @param   {string}   action.type                   The type of Redux action
 * @param   {object}   action.session                The newly created session
 * @param   {string}   action.session.id             The Brassroots id of the created session
 * @param   {string}   action.session.currentTrackID The Spotify id of the current queue track playing
 * @param   {string}   action.session.currentQueueID The Brassroots id of the current queue track playing
 * @param   {string}   action.session.ownerID        The Brassroots/Spotify id of the session owner
 * @param   {string}   action.session.mode           The mode the session is currently in
 * @param   {number}   action.session.distance       The distance of the session to the current user
 * @param   {number}   action.session.totalListeners The total amount of listeners in the session
 * 
 * @returns {object}                                 The state with the created session added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {sessionsByID} = state;
  const {session} = action;
  const updates = session && typeof session.id === 'string' && typeof sessionsByID === 'object'
    ? {
      lastUpdated,
      currentSessionID: session.id,
      joiningSession: false,
      error: null,
      totalSessions: Object.keys(sessionsByID).length + 1,
      sessionsByID: updateObject(sessionsByID, {
        [session.id]: singleSession(sessionsByID[session.id], action),
      }),
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