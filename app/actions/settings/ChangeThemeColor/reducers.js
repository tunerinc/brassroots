'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeThemeColorReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Start the request to change the theme of the app
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
      saving: saving.concat('theme'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'theme'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the theme color
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {string} action.theme The new status for the theme color
 * 
 * @returns {object}              The state with the theme color updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving} = state;
  const {theme} = action;
  const updates = Array.isArray(saving)
    ? {
      theme,
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'theme'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the change theme color failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'theme'),
      failed: failed.concat('theme'),
    }
    : {};
  
  return updateObject(state, updates);
}