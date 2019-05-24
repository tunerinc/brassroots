'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ClearNewPlaylistReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  initialState,
  type State,
} from '../../../reducers/playlists';

/**
 * Clears the new playlist object
 * 
 * @function clearNewPlaylist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the newPlaylist cleared
 */
export function clearNewPlaylist(
  state: State,
): State {
  const {newPlaylist}  = initialState;
  const updates = newPlaylist ? {newPlaylist} : {};
  return updateObject(state, updates);
}