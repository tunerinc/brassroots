'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewPlaylistMode
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Sets the mode for the new playlist being created
 * 
 * @function setNewPlaylistMode
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} action.mode The mode to set for the new playlist being created
 * 
 * @returns {object}             The state with the newPlaylist updated
 */
export function setNewPlaylistMode(
  state: State,
  action: Action,
): State {
  const {newPlaylist} = state;
  const {mode} = action;
  const updates = typeof mode === 'string' && typeof newPlaylist === 'object'
    ? {
      newPlaylist: updateObject(newPlaylist, {mode}),
    }
    : {};

  return updateObject(state, updates);
}