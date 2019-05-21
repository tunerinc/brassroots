'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSoundEffectsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/settings';

/**
 * Starts the request to change the sound effects setting
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the saving/failed props updated
 */
export function request(
  state: State,
): State {
  const {saving, failed} = state;
  const updates = Array.isArray(saving) && Array.isArray(failed)
    ? {
      saving: saving.concat('sound effects'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'sound effects'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the sound effects
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state         The Redux state
 * @param   {object}  action        The Redux action
 * @param   {string}  action.type   The type of Redux action
 * @param   {boolean} action.status The new status for the sound effects
 * 
 * @returns {object}                The state with the sound effects setting updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving} = state;
  const {status: soundEffects} = action;
  const updates = Array.isArray(saving)
    ? {
      soundEffects,
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'sound effects'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the change sound effects failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {saving, failed} = state;
  const {error} = action;
  const updates = Array.isArray(saving) && Array.isArray(failed)
    ? {
      error,
      saving: saving.filter(s => typeof s === 'string' && s !== 'sound effects'),
      failed: failed.concat('sound effects'),
    }
    : {};

  return updateObject(state, updates);
}