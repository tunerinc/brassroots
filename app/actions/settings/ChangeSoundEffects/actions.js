'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSoundEffects
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change sound effects request
 * 
 * @alias module:ChangeSoundEffects
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of  CHANGE_SOUND_EFFECTS_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_SOUND_EFFECTS_REQUEST};
}

/**
 * Notify the app of a change sound effects success
 * 
 * @alias module:ChangeSoundEffects
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} soundEffects The new status for sound effects
 *
 * @returns {object}               Redux action with the type of CHANGE_SOUND_EFFECTS_SUCCESS and the new sound effects status
 */
export function success(
  soundEffects: boolean,
): Action {
  return {
    type: types.CHANGE_SOUND_EFFECTS_SUCCESS,
    updates: {soundEffects},
  };
}

/**
 * Notify the app of a change sound effects failure
 * 
 * @alias module:ChangeSoundEffects
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change sound effects failure
 *
 * @returns {object}       Redux action with the type of CHANGE_SOUND_EFFECTS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_SOUND_EFFECTS_FAILURE,
    error,
  };
}