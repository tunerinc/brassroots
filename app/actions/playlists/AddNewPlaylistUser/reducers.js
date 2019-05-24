'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddNewPlaylistUserReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Adds a user as a member to the new playlist being created
 * 
 * @function addNewPlaylistUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {string} action.userID The Brassroots id of the user to add as a member to the new playlist
 * 
 * @returns {object}               The state with the user added as a member to the new playlist
 */
export function addNewPlaylistUser(
  state: State,
  action: Action,
): State {
  const {newPlaylist} = state;
  const {userID} = action;
  const updates = newPlaylist && newPlaylist.members
    ? {
      newPlaylist: updateObject(newPlaylist, {members: newPlaylist.members.concat(userID)}),
    }
    : {};

  return updateObject(state, updates);
}