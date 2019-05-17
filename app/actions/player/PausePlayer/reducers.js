'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PausePlayerReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/player';
import type {Action, State} from '../../../reducers/player';

/**
 * Starts the request to pause the player
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the the pausing prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {pausing: true, error: null});
}

/**
 * Confirms the success of pausing the player
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
  return updateObject(state, {lastUpdated, paused: true, pausing: false, error: null});
}

/**
 * Adds the error which caused the pause player failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the pause player failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, paused: false, pausing: false});
}