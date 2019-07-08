'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetRecentTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Starts the request to get the current user's recently played tracks
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingRecent prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingRecent: true, error: null});
}

/**
 * Confirms the success of getting the current user's recently played tracks
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingRecent prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {fetchingRecent: false, error: null});
}

/**
 * Adds the error which caused the get recent tracks failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get recent tracks failure
 * 
 * @returns   {object}            The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingRecent: false});
}