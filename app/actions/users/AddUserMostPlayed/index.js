'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserMostPlayed
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Add the most played tracks of a user
 * 
 * @function addUserMostPlayed
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}   userID     The Brassroots id of the user
 * @param   {string[]} mostPlayed The Spotify ids of the user's most played tracks
 * 
 * @returns {object}              Redux action with the type of ADD_USER_MOST_PLAYED and the most played track ids for the user
 */
export function addUserMostPlayed(
  userID: string,
  mostPlayed: Array<string>,
): Action {
  return {
    type: types.ADD_USER_MOST_PLAYED,
    userID,
    mostPlayed,
  };
}