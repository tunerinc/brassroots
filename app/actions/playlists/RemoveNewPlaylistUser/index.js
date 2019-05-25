'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveNewPlaylistUser
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Removes a user from the new playlist being created by the current user
 * 
 * @alias module:RemoveNewPlaylistUser
 * @function removeNewPlaylistUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} userID The user id to remove from the new playlist
 * 
 * @returns {object}        Redux action with the type of REMOVE_NEW_PLAYLIST_USER and the user id to remove
 */
export function removeNewPlaylistUser(
  userID: string,
): Action {
  return {
    type: types.REMOVE_NEW_PLAYLIST_USER,
    userID,
  };
}