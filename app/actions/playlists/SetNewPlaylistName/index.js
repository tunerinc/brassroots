'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewPlaylistName
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Sets the name for the new playlist
 * 
 * @alias module:SetNewPlaylistName
 * @function setNewPlaylistName
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} name The name to set for the new playlist
 * 
 * @returns {object}      Redux action with the type of SET_NEW_PLAYLIST_NAME and the new name to set
 */
export function setNewPlaylistName(
  name: string,
): Action {
  return {
    type: types.SET_NEW_PLAYLIST_NAME,
    name,
  };
}