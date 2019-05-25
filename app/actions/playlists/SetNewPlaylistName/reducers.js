'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewPlaylistName
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Sets the name for the new playlist being created
 * 
 * @function setNewPlaylistName
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} action.name The name to set for the new playlist being created
 * 
 * @returns {object}             The state with the newPlaylist updated
 */
export function setNewPlaylistName(
  state: State,
  action: Action,
): State {
  const {newPlaylist} = state;
  const {name} = action;
  const updates = newPlaylist && typeof name === 'string'
    ? {
      newPlaylist: updateObject(newPlaylist, {name}),
    }
    : {};

  return updateObject(state, updates);
}