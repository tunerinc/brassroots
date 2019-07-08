'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveNewPlaylistUser
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Removes a user as a member from the new playlist being created
 * 
 * @function removeNewPlaylistUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {string} action.userID The Brassroots id of the user to remove as a member from the new playlist
 * 
 * @returns {object}               The state with the user removed from the new playlist
 */
export function removeNewPlaylistUser(
  state: State,
  action: Action,
): State {
  const {newPlaylist} = state;
  const {userID} = action;
  const updates = newPlaylist && newPlaylist.members
    ? {
      newPlaylist: updateObject(newPlaylist, {
        members: newPlaylist.members.filter(id => id !== userID),
      }),
    }
    : {};

  return updateObject(state, updates);
}