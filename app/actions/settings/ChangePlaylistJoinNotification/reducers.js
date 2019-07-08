'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistJoinNotificationReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/settings';

/**
 * Starts the request to change the playlist join notification
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
      saving: saving.concat('playlist join'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'playlist join'),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirm the success of changing the playlist join notification
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state         The Redux state
 * @param   {object}  action        The Redux action
 * @param   {string}  action.type   The type of Redux action
 * @param   {boolean} action.status The new status for the playlist join notification
 * 
 * @returns {object}                The state with the playlist join notification setting updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving, notify} = state;
  const {status: playlistJoin} = action;
  const updates = Array.isArray(saving)
    ? {
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'playlist join'),
      notify: updateObject(notify, {playlistJoin}),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the change playlist join notification failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'playlist join'),
      failed: failed.concat('playlist join'),
    }
    : {};

  return updateObject(state, updates);
}