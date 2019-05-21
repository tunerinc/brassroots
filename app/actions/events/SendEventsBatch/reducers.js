'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SendEventsBatchReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  initialState,
  lastTimeSent,
  type Action,
  type State,
} from '../../../reducers/events';

/**
 * Starts the request to send the events batch to ES/EC
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the uploading prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {uploading: true, error: null});
}

/**
 * Confirms the success of sending the events batch to ES/EC
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} The state with the batch cleared
 */
export function success(): State {
  return updateObject(initialState, {lastTimeSent});
}

/**
 * Adds the error which caused the send events failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the send events failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, uploading: false});
}