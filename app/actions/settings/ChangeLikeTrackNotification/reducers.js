'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeLikeTrackNotificationReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to change the like track notification
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
      saving: saving.concat('liked track'),
      failed: failed.filter(s => typeof s === 'string' && s !== 'liked track'),
    }
    : {};

  return updateObject(state, updates);
};

/**
 * Confirm the success of changing the like track notification
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state         The Redux state
 * @param   {object}  action        The Redux action
 * @param   {string}  action.type   The type of Redux action
 * @param   {boolean} action.status The new status for like track notifications
 * 
 * @returns {object}                The state with the notification setting updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {saving, notify} = state;
  const {status: likedTrack} = action;
  const updates = Array.isArray(saving)
    ? {
      lastUpdated,
      saving: saving.filter(s => typeof s === 'string' && s !== 'liked track'),
      notify: updateObject(notify, {likedTrack}),
    }
    : {};

  return updateObject(state, updates);
};

/**
 * Adds the error which caused the change like track notification failure
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
      saving: saving.filter(s => typeof s === 'string' && s !== 'liked track'),
      failed: failed.concat('liked track'),
    }
    : {};

  return updateObject(state, updates);
};