'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleMuteReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/player';
import type {Action, State} from '../../../reducers/player';

/**
 * Starts the request to toggle mute on the player
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the muting prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {muting: true, error: null});
}

/**
 * Confirms the success of toggling mute on the player
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state         The Redux state
 * @param   {object}  action        The Redux action
 * @param   {string}  action.type   The type of Redux action
 * @param   {boolean} action.status The new muted status of the player
 * 
 * @returns {object}                The state with the muted prop updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {status: muted} = action;
  return updateObject(state, {lastUpdated, muted, muting: false, error: null});
}

/**
 * Adds the error which caused the toggle mute failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the toggle mute failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, muting: false});
}