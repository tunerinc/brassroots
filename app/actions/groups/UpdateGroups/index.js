'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateGroups
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/groups';

/**
 * Updates any of the values in the groups state
 * 
 * @function updateGroups
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the groups state
 * 
 * @returns {object}         Redux action with the type of UPDATE_GROUPS and the updates to make
 */
export function updateGroups(
  updates: State,
): Action {
  return {
    type: types.UPDATE_GROUPS,
    updates,
  };
}