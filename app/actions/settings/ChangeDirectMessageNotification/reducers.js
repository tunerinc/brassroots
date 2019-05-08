'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeDirectMessageNotificationReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to change the direct message notification for the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the notification saving/failed props updated
 */
export function request(
  state: State,
): State {
  const {saving, failed} = state;
  const updates = Array.isArray(saving) && Array.isArray(failed)
    ? {
      saving: saving.concat('direct message'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'direct message'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the direct message notification
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {string} action.status The new status for the notification setting
 * 
 * @returns {object}               The state with the new notification setting updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving, notify} = state;
  const {status: message} = action;
  const updates = Array.isArray(saving)
    ? {
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'direct message'),
      notify: updateObject(notify, {message}),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Add the error which caused the change direct message notification failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'direct message'),
      failed: failed.concat('direct message'),
    }
    : {};

  return updateObject(state, updates);
}