'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserRecentlyPlayedReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleUser,
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Adds the recently played tracks of a user
 * 
 * @function addUserRecentlyPlayed
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                 The Redux state
 * @param   {object}   action                The Redux action
 * @param   {string}   action.type           The type of Redux action
 * @param   {string}   action.userID         The Brassroots id of the user
 * @param   {string[]} action.recentlyPlayed The Spotify ids of the user's recently played tracks
 * 
 * @returns {object}                         The state with the recently played tracks added to the single user
 */
export function addUserRecentlyPlayed(
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