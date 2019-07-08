'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeNewFollowerNotificationReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/settings';

/**
 * Starts the request to change the new follower notification
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
      saving: saving.concat('new follower'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'new follower'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the new follower notification
 * 
 * @function success
 * 
 * @param   {object}  state         The Redux state
 * @param   {object}  action        The Redux action
 * @param   {string}  action.type   The type of Redux action
 * @param   {boolean} action.status The new status for the new follower notification
 * 
 * @returns {object}                The state with the new follower notification setting updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving, notify} = state;
  const {status: newFollower} = action;
  const updates = Array.isArray(saving)
    ? {
      lastUpdated,
      saving: saving.filter(s => s !== 'new follower'),
      notify: updateObject(notify, {newFollower}),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the change new follower notification failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'new follower'),
      failed: failed.concat('new follower'),
    }
    : {};

  return updateObject(state, updates);
}