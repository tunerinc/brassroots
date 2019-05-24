'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ClearNewPlaylist
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Clears the playlist the user was creating
 * 
 * @alias module:ClearNewPlaylist
 * @function clearNewPlaylist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CLEAR_NEW_PLAYLIST
 */
export function clearNewPlaylist(): Action {
  return {
    type: types.CLEAR_NEW_PLAYLIST,
  };
}
