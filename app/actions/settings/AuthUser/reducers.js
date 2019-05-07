'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AuthorizeUserReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to authorize the current user with Spotify / Brassroots
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the updated logging in props
 */
export function request(
  state: State,
): State {
  return updateObject(state, {loggingIn: true, error: null});
}

/**
 * Confirm the success of authorizing the current user with Spotify / Brassroots
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the updated values notifying of a successful authorization
 */
export function success(
  state: State,
): State {
  return updateObject(state, {lastUpdated, loggingIn: false, loggedIn: true, error: null});
}

/**
 * Add the error which caused the authorize user failure
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
  return updateObject(state, {error, loggingIn: false});
}