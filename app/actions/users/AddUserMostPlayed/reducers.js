'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserMostPlayedReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleUser,
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Adds the most played tracks of a user
 * 
 * @function addUserMostPlayed
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state             The Redux state
 * @param   {object}   action            The Redux action
 * @param   {string}   action.type       The type of Redux action
 * @param   {string}   action.userID     The Brassroots id of the user
 * @param   {string[]} action.mostPlayed The Spotify ids of the user's most played tracks
 * 
 * @returns {object}                     The state with the most played tracks added to the single user
 */
export function addUserMostPlayed(
  state: State,
  action: Action,
): State {
  const {usersByID} = state;
  const {userID} = action;
  const updates = typeof userID === 'string' && typeof usersByID === 'object'
    ? {
      lastUpdated,
      error: null,
      usersByID: updateObject(usersByID, {
        [userID]: singleUser(usersByID[userID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}