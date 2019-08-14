'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentUserReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Adds the current user's profile information
 * 
 * @function addCurrentUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                The Redux state
 * @param   {object} action               The Redux action
 * @param   {string} action.type          The type of Redux action
 * @param   {object} action.currentUserID The current user's Spotify id
 * 
 * @returns {object}                      The state with the current user's Spotify id added
 */
export function addCurrentUser(
  state: State,
  action: Action,
): State {
  const {currentUserID} = action;
  const updates = typeof currentUserID === 'string'
    ? {lastUpdated, currentUserID}
    : {};

  return updateObject(state, updates);
}