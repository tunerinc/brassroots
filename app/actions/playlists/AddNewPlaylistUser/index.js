'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddNewPlaylistUser
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Adds a new user to the new playlist being created by the current user
 * 
 * @alias module:AddNewPlaylistUser
 * @function addNewPlaylistUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} userID The user id to add to the new playlist
 * 
 * @returns {object}        Redux action with the type of ADD_NEW_PLAYLIST_USER and the user id to add
 */
export function addNewPlaylistUser(
  userID: string,
): Action {
  return {
    type: types.ADD_NEW_PLAYLIST_USER,
    userID,
  };
}