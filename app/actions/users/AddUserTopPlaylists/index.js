'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserTopPlaylists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Adds the top playlists of a single user
 * 
 * @function addUserTopPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}   userID       The Brassroots id of the user
 * @param   {string[]} topPlaylists The Spotify ids of the top playlists øf the single user
 * 
 * @returns {object}                Redux action with the type of ADD_USER_TOP_PLAYLISTS and the top playlist ids for the user
 */
export function addUserTopPlaylists(
  userID: string,
  topPlaylists: Array<string>,
): Action {
  return {
    type: types.ADD_USER_TOP_PLAYLISTS,
    userID,
    topPlaylists,
  };
}