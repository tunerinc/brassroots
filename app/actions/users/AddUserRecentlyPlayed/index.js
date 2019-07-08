'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserRecentlyPlayed
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Add the recently played tracks of a user
 * 
 * @function addUserRecentlyPlayed
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}   userID         The Brassroots id of the user
 * @param   {string[]} recentlyPlayed The Spotify ids of the user's recently played tracks
 * 
 * @returns {object}                  Redux action with the type of ADD_USER_RECENTLY_PLAYED and the recently played track ids for the user
 */
export function addUserRecentlyPlayed(
  userID: string,
  recentlyPlayed: Array<string>,
): Action {
  return {
    type: types.ADD_USER_RECENTLY_PLAYED,
    userID,
    recentlyPlayed,
  };
}