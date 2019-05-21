'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleRepeatReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Starts the request to toggle repeat on the player
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the repeating prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {repeating: true, error: null});
}

/**
 * Confirms the success of toggling repeat on the player
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state         The Redux state
 * @param   {object}  action        The Redux action
 * @param   {string}  action.type   The type of Redux action
 * @param   {boolean} action.status The new repeat status of the player
 * 
 * @returns {object}                The state with the repeat prop updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {status: repeat} = action;
  return updateObject(state, {lastUpdated, repeat, repeating: false, error: null});
}

/**
 * Adds the error which caused the toggle repeat failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the toggle repeat failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, repeating: false});
}