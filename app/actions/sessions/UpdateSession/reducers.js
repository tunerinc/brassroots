'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateSessionReducers
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
 * Updates a single session with new values
 * 
 * @function updateSingleSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                           The Redux state
 * @param   {object} action                          The Redux action
 * @param   {string} action.type                     The type of Redux action
 * @param   {string} action.sessionID                The Brassroots id of the session to update
 * @param   {object} action.updates                  The updates to make to the single session
 * @param   {string} [action.updates.currentTrackID] The Spotify id of the new current track playing
 * @param   {string} [action.updates.currentQueueID] The Brassroots id of the new current track playing
 * @param   {string} [action.updates.ownerID]        The Brassrootds id of the new session owner
 * @param   {number} [action.updates.distance]       The new distance of the session owner to the current user in miles
 * @param   {string} [action.updates.mode]           The new mode for the single session
 * @param   {number} [action.updates.totalListeners] The total amount of listeners inside of the session
 * 
 * @returns {object}                                 The state of the single session updated with the new values
 */
export function updateSingleSession(
  state: Session,
  action: Action,
): Session {
  const {
    currentTrackID: oldTrackID,
    currentQueueID: oldQueueID,
    ownerID: oldOwnerID,
    distance: oldDistance,
    mode: oldMode,
    totalListeners: oldTotal,
  } = state;

  const {updates} = action;

  const changes = updates
    ? {
      lastUpdated,
      currentTrackID: updates.currentTrackID || oldTrackID,
      currentQueueID: updates.currentQueueID || oldQueueID,
      ownerID: updates.ownerID || oldOwnerID,
      distance: updates.distance || oldDistance,
      mode: updates.mode || oldMode,
      totalListeners: updates.totalListeners || oldTotal,
    }
    : {};


  return updateObject(state, changes);
}

/**
 * Updates a single session with new values
 * 
 * @function updateSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                           The Redux state
 * @param   {object} action                          The Redux action
 * @param   {string} action.type                     The type of Redux action
 * @param   {string} action.sessionID                The Brassroots id of the session to update
 * @param   {object} action.updates                  The updates to make to the single session
 * @param   {string} [action.updates.currentTrackID] The Spotify id of the new current track playing
 * @param   {string} [action.updates.currentQueueID] The Brassroots id of the new current track playing
 * @param   {string} [action.updates.ownerID]        The Brassrootds id of the new session owner
 * @param   {number} [action.updates.distance]       The new distance of the session owner to the current user in miles
 * @param   {string} [action.updates.mode]           The new mode for the single session
 * @param   {number} [action.updates.totalListeners] The total amount of listeners inside of the session
 * 
 * @returns {object}                                 The state with the single session updated with the new values
 */
export function updateSession(
  state: State,
  action: Action,
): State {
  const {sessionsByID} = state;
  const {sessionID} = action;
  const updates = typeof sessionID === 'string' && typeof sessionsByID === 'object'
    ? {
      error: null,
      sessionsByID: updateObject(sessionsByID, {
        [sessionID]: singleSession(sessionsByID[sessionID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}