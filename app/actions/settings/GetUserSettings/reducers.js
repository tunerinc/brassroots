'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserSettingsReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/settings';
import type {Action, State} from '../../../reducers/settings';

/**
 * Starts the request to get the current user's settings from Firestore
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingSettings props updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingSettings: true, error: null});
}

/**
 * Confirm the success of getting the current user's settings from Firestore
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingSettings prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {lastUpdated, fetchingSettings: false, error: null});
}

/**
 * Adds the error which caused the get user settings failure
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
  return updateObject(state, {error, fetchingSettings: false});
}