'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeNearbySessionNotificationReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to change the nearby sessions notification
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
      saving: saving.concat('nearby session'),
      failed: failed.filter(s => s !== 'nearby session'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the nearby session notification
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {string} action.status The new status for the nearby session notification
 * 
 * @returns {object}               The state with the nearby session notification setting updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving, notify} = state;
  const {status: nearbySession} = action;
  const updates = Array.isArray(saving)
    ? {
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'nearby session'),
      notify: updateObject(notify, {nearbySession}),
    }
    : {};

  return updateObject(state, updates);
};

/**
 * Adds the error which caused the change nearby session notification  failure
 * 
 * @function failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'nearby session'),
      failed: failed.concat('nearby session'),
    }
    : {};

  return updateObject(state, updates);
};