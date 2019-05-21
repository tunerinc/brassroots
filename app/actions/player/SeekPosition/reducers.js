'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SeekPositionReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Starts the request to seek to a new position in the currently playing track
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the seeking prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {seeking: true, error: null});
}

/**
 * Confirms the success of seeking the current track to a new progress
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the seeking prop updated
 */
export function success(
  state: State,
) {
  return updateObject(state, {seeking: false, error: null});
}

/**
 * Adds the error which caused the seek position failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the seek position failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, seeking: false});
}