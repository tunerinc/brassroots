'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetPlayer
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Resets the redux player state object
 * 
 * @function resetPlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_PLAYER
 */
export function resetPlayer(): Action {
  return {type: types.RESET_PLAYER};
}