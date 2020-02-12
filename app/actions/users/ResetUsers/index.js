'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetUsers
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Resets the redux users state object
 * 
 * @alias module:ResetUsers
 * @function resetUsers
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_USERS
 */
export function resetUsers(): Action {
  return {type: types.RESET_USERS};
}