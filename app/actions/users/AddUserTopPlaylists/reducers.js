'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserTopPlaylistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleUser,
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Adds the top playlists of a user
 * 
 * @function addUserTopPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state               The Redux state
 * @param   {object}   action              The Redux action
 * @param   {string}   action.type         The type of Redux action
 * @param   {string}   action.userID       The Brassroots id of the user
 * @param   {string[]} action.topPlaylists The Spotify ids of the user's top playlists
 * 
 * @returns {object}                       The state with the top playlists added to the single user
 */
export function addUserTopPlaylists(
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