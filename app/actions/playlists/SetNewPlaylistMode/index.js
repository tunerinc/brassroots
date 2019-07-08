'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewPlaylistMode
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Sets the mode for the new playlist being created by the current user
 * 
 * @alias module:SetNewPlaylistMode
 * @function setNewPlaylistMode
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} mode The mode to set for the new playlist
 * 
 * @returns {object}      Redux action with the type of SET_NEW_PLAYLIST_MODE and the new mode
 */
export function setNewPlaylistMode(
  mode: string,
): Action {
  return {
    type: types.SET_NEW_PLAYLIST_MODE,
    mode,
  };
}