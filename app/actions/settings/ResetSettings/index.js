'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetSettings
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Resets the redux settings state object
 * 
 * @alias module:ResetSettings
 * @function resetSettings
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_SETTINGS
 */
export function resetSettings(): Action {
  return {
    type: types.RESET_SETTINGS,
  };
}