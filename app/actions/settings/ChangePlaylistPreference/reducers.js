'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistPreferenceReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to change the playlist preference
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
      saving: saving.concat('playlist pref'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'playlist pref'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the playlist preference
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {string} action.status The new status for the playlist preference
 * 
 * @returns {object}               The state with the playlist preference updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving, preference} = state;
  const {status: playlist} = action;
  const updates = Array.isArray(saving)
    ? {
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'playlist pref'),
      preference: updateObject(preference, {playlist}),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the change playlist preference failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'playlist pref'),
      failed: failed.concat('playlist pref'),
    }
    : {};

  return updateObject(state, updates);
}