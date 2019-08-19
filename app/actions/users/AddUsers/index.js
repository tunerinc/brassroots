'use strict';

/**
 * @module AddUsers
 */

import * as types from '../types';

/**
 * Adds users retrieved from Ultrasound
 * 
 * @alias module:AddUsers
 * @function addUsers
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} users The users to add to the current user's session
 *
 * @returns {object}       Redux action with the type of ADD_USERS and the users to add
 */
export function addUsers(users) {
  return {
    type: types.ADD_USERS,
    users,
  };
}
