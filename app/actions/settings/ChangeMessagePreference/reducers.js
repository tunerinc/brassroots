'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeMessagePreferenceReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to change the message preference
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
      saving: saving.concat('message pref'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'message pref'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the message preference
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {string} action.status The new status for the message preference
 * 
 * @returns {object}               The state with the message preference updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving, preference} = state;
  const {status: message} = action;
  const updates = Array.isArray(saving)
    ? {
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'message pref'),
      preference: updateObject(preference, {message}),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the change message preference failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'message pref'),
      failed: failed.concat('message pref'),
    }
    : {};

  return updateObject(state, updates);
}