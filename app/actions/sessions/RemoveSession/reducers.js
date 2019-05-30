'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveSessionReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Removes a session from Redux
 * 
 * @function removeSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state            The Redux state
 * @param   {object} action           The Redux action
 * @param   {string} action.type      The type of Redux action
 * @param   {string} action.sessionID The Brassroots id of the session to remove
 * 
 * @returns {object}                  The state with the session and the associated chat messages removed
 */
export function removeSession(
  state: State,
  action: Action,
): State {
  const {totalSessions, sessionsByID} = state;
  const {sessionID} = action;
  const updates = (
    typeof sessionID === 'string'
    && typeof totalSessions === 'number'
    && typeof sessionsByID === 'object'
  )
    ? {
      totalSessions: totalSessions - 1,
      error: null,
      sessionsByID: Object.keys(sessionsByID)
        .filter(id => id !== sessionID)
        .reduce((obj, id) => updateObject(obj, {[id]: sessionsByID[id]}), {}),
    }
    : {};

  return updateObject(state, updates);
}