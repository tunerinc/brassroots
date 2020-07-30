'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SeekPosition
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a seek position request
 *
 * @alias module:SeekPosition
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of SEEK_POSITION_REQUEST
 */
export function request(): Action {
  return {type: types.UPDATE_PLAYER};
}