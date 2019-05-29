'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopQueueListenerReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Confirms the success of stopping the queue realtime listener
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the unsubscribe and fetchingQueue props updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {unsubscribe: null, error: null});
}

/**
 * Adds the error which caused the stop queue listener failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the stop queue listener failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error});
}