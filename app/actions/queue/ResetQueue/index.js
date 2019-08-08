'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetQueue
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Resets the redux queue state object
 * 
 * @alias module:ResetQueue
 * @function resetQueue
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_QUEUE
 */
export function resetQueue(): Action {
  return {type: types.RESET_QUEUE};
}