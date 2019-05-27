
'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetMostPlayedTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Starts the request to get a user's most played tracks
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingMostPlayed prop updatedd
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingMostPlayed: true, error: null});
}

/**
 * Confirms the success of getting a user's most played tracks
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingMostPlayed prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {lastUpdated, fetchingMostPlayed: false, error: null});
}

/**
 * Adds the error which caused the get most played tracks failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get most played tracks failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingMostPlayed: false});
}