'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetSessionQueueReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Starts the request to get the queue from a session
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingQueue prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingQueue: true, error: null});
}

/**
 * Confirms the success of getting the queue and starting a realtime listener
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}      state              The Redux state
 * @param   {object}      action             The Redux action
 * @param   {string}      action.type        The type of Redux action
 * @param   {string[]}    action.queue       The Brassroots ids of the queue tracks
 * @param   {unsubscribe} action.unsubscribe The function to invoke to unsubscribe from the queue listener
 * 
 * @returns {object}                         The state with the queue and unsubscribe function added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {unsubscribe, queue: userQueue} = action;
  const updates = Array.isArray(userQueue) && typeof unsubscribe === 'function'
    ? {
      userQueue,
      unsubscribe,
      fetchingQueue: false,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get session queue failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get session queue failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingQueue: false});
}