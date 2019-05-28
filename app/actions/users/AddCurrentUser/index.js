'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentUser
 */

import * as types from '../types';
import {
  type User,
  type Action,
} from '../../../reducers/users';

/**
 * Adds the current user's profile information
 * 
 * @alias module:AddCurrentUser
 * @function addCurrentUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} user The current user's profile retrieved from Brassroots
 *
 * @returns {object}      Redux action with the type of ADD_CURRENT_USER and the current user
 */
export function addCurrentUser(
  user: User,
): Action {
  return {
    type: types.ADD_CURRENT_USER,
    user,
  };
}