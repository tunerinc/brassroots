'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module QueueTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Starts the request to queue a track in the session the current user is in
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the queueing prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {queueing: true, error: null});
}

/**
 * Confirms the success of queueing the track in the session the current user is in
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the queueing prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {lastUpdated, queueing: false, error: null});
}

/**
 * Adds the error which caused the queue track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the queue track failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, queueing: false});
}