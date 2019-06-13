'use strict';

/**
 * @module AddPlaylists
 */

import * as types from '../types';

/**
 * Adds the current user's playlists retrieved from Drizzle
 * 
 * @alias module:AddPlaylists
 * @function addPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} playlists The playlist objects retrieved from Drizzle
 *
 * @returns {object}           Redux action with the type of ADD_PLAYLISTS and the retrieved playlists
 */
export function addPlaylists(playlists) {
  return {
    type: types.ADD_PLAYLISTS,
    playlists,
  };
}
