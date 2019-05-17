'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module TogglePauseReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/player';
import type {Action, State} from '../../../reducers/player';

/**
 * Starts the request to toggle pause on the player
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the pausing prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {pausing: true, error: null});
}

/**
 * Confirms the success of toggling pause on the player
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state           The Redux state
 * @param   {object}  action          The Redux action
 * @param   {string}  action.type     The type of Redux action
 * @param   {number}  action.progress The progres to set the player at
 * @param   {boolean} action.status   The new paused status of the player
 * 
 * @returns {object}                  The state with the progress and paused props updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {progress, status: paused} = action;
  return updateObject(state, {lastUpdated, progress, paused, pausing: false, error: null});
}

/**
 * Adds the error which caused the toggle pause failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the toggle pause failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, pausing: false});
}