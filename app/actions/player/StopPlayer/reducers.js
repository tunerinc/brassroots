'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopPlayerReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Starts the request to stop the player
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
 * Confirms the success of the player being stopped
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the paused prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {lastUpdated, pausing: false, paused: true, progress: 0, error: null});
}

/**
 * Adds the error which caused the stop player failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the stop player failure
 * 
 * @returns {object}              The state with the paused prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, pausing: false, paused: false});
}