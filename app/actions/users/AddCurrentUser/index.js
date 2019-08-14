'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentUser
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Adds the current user's profile information
 * 
 * @alias module:AddCurrentUser
 * @function addCurrentUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} currentUserID The current user's Spotify id
 *
 * @returns {object}               Redux action with the type of ADD_CURRENT_USER and the current user's Spotify id
 */
export function addCurrentUser(
  currentUserID: string,
): Action {
  return {
    type: types.ADD_CURRENT_USER,
    currentUserID,
  };
}