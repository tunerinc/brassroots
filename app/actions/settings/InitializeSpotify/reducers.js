'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module InitializeSpotifyReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/settings';

/**
 * Starts the request to initialize the Spotify module
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the initializing props updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {initializing: true, error: null});
}

/**
 * Confirm the success of initializing the Spotify module
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state           The Redux state
 * @param   {object}  action          The Redux action
 * @param   {string}  action.type     The type of Redux action
 * @param   {boolean} action.loggedIn Whether or not the current user is logged in
 * 
 * @returns {object}                  The state with the initializing/loggedIn props updated
 */
export function success(
  state: State,
  action: Action,
) {
  const {loggedIn} = action;
  return updateObject(state, {loggedIn, lastUpdated, initializing: false});
}

/**
 * Adds the error which caused the initialize spotify failure
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
  return updateObject(state, {error, initializing: false});
}