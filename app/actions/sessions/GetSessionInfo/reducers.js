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
 * @param   {object}    state                         The Redux state
 * @param   {object}    action                        The Redux action
 * @param   {string}    action.type                   The type of Redux action
 * @param   {object}    action.session                The newly created session
 * @param   {string}    action.session.id             The Brassroots id of the created session
 * @param   {string}    action.session.currentTrackID The Spotify id of the current queue track playing
 * @param   {string}    action.session.currentQueueID The Brassroots id of the current queue track playing
 * @param   {string}    action.session.ownerID        The Brassroots/Spotify id of the session owner
 * @param   {string}    action.session.mode           The mode the session is currently in
 * @param   {number}    action.session.distance       The distance of the session to the current user
 * @param   {number}    action.session.totalListeners The total amount of listeners in the session
 * @param   {number}    action.session.totalPlayed    The total amount of tracks that have been played
 * @param   {infoUnsub} action.unsubscribe            The function to invoke to unsubscribe the chat listener
 * 
 * @returns {object}                                  The state with the session info added/updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {sessionsByID} = state;
  const {session, unsubscribe: infoUnsubscribe} = action;
  const updates = session && typeof session.id === 'string' && typeof sessionsByID === 'object'
    ? {
      lastUpdated,
      infoUnsubscribe,
      currentSessionID: session.id,
      fetchingInfo: false,
      error: null,
      sessionsByID: updateObject(sessionsByID, {
        [session.id]: singleSession(sessionsByID[session.id], action),
      }),
    }
    : {};

  return updateObject(state, updates);
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