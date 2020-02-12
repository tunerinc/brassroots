'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateUsers
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Updates any of the values in the users state
 * 
 * @function updateUsers
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the users state
 * 
 * @returns {object}         Redux action with the type of UPDATE_USERS and the updates to make
 */
export function updateUsers(
  updates: State,
): Action {
  return {
    type: types.UPDATE_USERS,
    updates,
  };
}