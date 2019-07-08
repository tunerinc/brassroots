'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionModeReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to change the mode of a session
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the changingMode prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {changingMode: true, error: null});
}

/**
 * Confirms the success of changing the mode of a session
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the changingMode prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {changingMode: false, error: null});
}

/**
 * Adds the error which caused the change session mode failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the change session mode failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, changingMode: false});
}