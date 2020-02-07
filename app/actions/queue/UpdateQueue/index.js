'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateQueue
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Updates any of the values in the queue state
 * 
 * @function updateQueue
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the queue state
 * 
 * @returns {object}         Redux action with the type of UPDATE_QUEUE and the updates to make
 */
export function updateQueue(
  updates: State,
): Action {
  return {
    type: types.UPDATE_QUEUE,
    updates,
  };
}