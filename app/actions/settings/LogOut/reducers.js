'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module LogOutReducers
 */

import updateObject from '../../../utils/updateObject';
import {initialState} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to log the current user out of Spotify / Brassroots
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the loggingOut prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {loggingOut: true, error: null});
}

/**
 * Confirm the success of logging the current user out
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} The initial state with the initialized prop set to `true`
 */
export function success(): State {
  return updateObject(initialState, {initialized: true});
}

/**
 * Adds the error which caused the log out failure
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
  const {error} = action;
  return updateObject(state, {error, loggingOut: false});
}