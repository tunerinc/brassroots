'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddRecentTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Starts the request to add a track to the current user's recently played
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the addingRecent prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {addingRecent: true, error: null});
}

/**
 * Confirms the sucess of adding the recently played track for the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the addingRecent prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {addingRecent: false, error: null});
}

/**
 * Adds the error which caused the add recent track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the add recent track failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, addingRecent: false});
}