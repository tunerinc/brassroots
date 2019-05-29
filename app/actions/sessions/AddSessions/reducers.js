'use strict';

/**
 * @module AddSessionsReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated, singleSession} from '../../../reducers/sessions';

type Session = {
  id: string,
  currentTrackID: string,
  currentQueueID: string,
  ownerID: string,
  mode: string,
  distance: number,
  totalListeners: number,
};

/**
 * Adds a single session to Redux
 * 
 * @function addSingleSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                         The Redux state
 * @param   {object}   action                        The Redux action
 * @param   {string}   action.type                   The type of Redux action
 * @param   {string}   action.userID                 The Brassroots id of the current user
 * @param   {object}   action.session                The newly created session
 * @param   {string}   action.session.id             The Brassroots id of the created session
 * @param   {string}   action.session.currentTrackID The Spotify id of the current queue track playing
 * @param   {string}   action.session.currentQueueID The Brassroots id of the current queue track playing
 * @param   {string}   action.session.ownerID        The Brassroots/Spotify id of the session owner
 * @param   {string}   action.session.mode           The mode the session is currently in
 * @param   {number}   action.session.distance       The distance of the session to the current user
 * @param   {number}   action.session.totalListeners The total amount of listeners in the session
 * 
 * @returns {object}                                 The state of the single session updated
 */
export function addSingleSession(state, action) {
  const {session} = action;
  return updateObject(state, {lastUpdated, ...session});
}

/**
 * Adds sessions to Redux
 * 
 * @function addSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state           The Redux state
 * @param   {object} action          The Redux action
 * @param   {string} action.type     The type of Redux action
 * @param   {object} action.sessions The session objects to add
 * 
 * @returns {object}                 The state with the sessions added
 */
export function addSessions(state, action) {
  const {sessions} = action;

  let {sessionsByID} = state;

  Object.values(sessions).forEach(session => {
    const addedSession = singleSession(sessionsByID[session.id], {...action, session});
    sessionsByID = updateObject(sessionsByID, {[session.id]: addedSession});
  });

  return updateObject(state, {
    sessionsByID,
    totalSessions: Object.keys(sessionsByID).length,
    error: null,
  });
}