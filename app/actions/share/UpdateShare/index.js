'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateShare
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/share';

/**
 * Updates any of the values in the share state
 * 
 * @function updateShare
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the share state
 * 
 * @returns {object}         Redux action with the type of UPDATE_SHARE and the updates to make
 */
export function updateShare(
  updates: State,
): Action {
  return {
    type: types.UPDATE_SHARE,
    updates,
  };
}