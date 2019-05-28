'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserRecentTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Adds the recently played track to the current user
 * 
 * @alias module:AddUserRecentTrack
 * @function addUserRecentTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} trackID The Spotify id of the recently played track
 * 
 * @returns {object}         Redux action with the type of ADD_USER_RECENT_TRACK and the recent track's Spotify id
 */
export function addUserRecentTrack(
  trackID: string,
): Action {
  return {
    type: types.ADD_USER_RECENT_TRACK,
    trackID,
  };
}