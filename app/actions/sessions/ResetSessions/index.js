'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetSessions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Resets the redux sessions state object
 * 
 * @alias module:ResetSessions
 * @function resetSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_SESSIONS
 */
export function resetSessions(): Action {
  return {type: types.RESET_SESSIONS};
}