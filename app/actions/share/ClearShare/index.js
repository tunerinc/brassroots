'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ClearShare
 */

import * as types from '../types';
import type {Action} from '../../../reducers/share';

/**
 * Clears the share information for the current user
 * 
 * @alias module:ClearShare
 * @function clearShare
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CLEAR_SHARE
 */
export function clearShare(): Action {
  return {
    type: types.CLEAR_SHARE,
  };
}
