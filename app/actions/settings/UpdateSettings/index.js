'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateSettings
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/settings';

/**
 * Updates any of the values in the settings state
 * 
 * @function updateSettings
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the settings state
 * 
 * @returns {object}         Redux action with the type of UPDATE_SETTINGS and the updates to make
 */
export function updateSettings(
  updates: State,
): Action {
  return {
    type: types.UPDATE_SETTINGS,
    updates,
  };
}