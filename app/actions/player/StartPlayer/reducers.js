'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StartPlayerReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Starts the request to start the player
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the attemptingToPlay prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {attemptingToPlay: true, error: null});
}

/**
 * Confirms the success of starting the player
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the attemptingToPlay & paused props updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {lastUpdated, paused: false, attemptingToPlay: false, error: null});
}

/**
 * Adds the error which caused the start player failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the start player failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, attemptingToPlay: false});
}