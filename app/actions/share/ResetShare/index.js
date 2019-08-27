'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetShare
 */

import * as types from '../types';
import {type Action} from '../../../reducers/share';

/**
 * Resets the share information for the current user
 * 
 * @alias module:ResetShare
 * @function resetShare
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of RESET_SHARE
 */
export function resetShare(): Action {
  return {type: types.RESET_SHARE};
}
