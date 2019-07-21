'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserQueueReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
  type QueueTrack,
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
  const {queueByID, userQueue: oldQueue} = state;
  const {unsubscribe, queue: userQueue} = action;
  const newQueue: Array<string> = Array.isArray(userQueue) && Array.isArray(oldQueue)
    ? [...oldQueue, ...userQueue]
      .filter((el, i, arr) => i === arr.indexOf(el))
      .sort((a, b) => {
        if (
          typeof queueByID !== 'undefined'
          && typeof queueByID[a].seconds === 'number'
          && typeof queueByID[b].seconds === 'number'
          && typeof queueByID[a].nanoseconds === 'number'
          && typeof queueByID[b].nanoseconds === 'number'
        ) {
          const {seconds: secA, nanoseconds: nanoA} = queueByID[a];
          const {seconds: secB, nanoseconds: nanoB} = queueByID[b];
          return secA < secB ? -1 : secA > secB ? 1 : nanoA < nanoB ? -1 : nanoA > nanoB ? 1 : 0;
        } else {
          return 0;
        }
      })
    : [];

  const updates = (
    Array.isArray(userQueue)
    && typeof unsubscribe === 'function'
    && Array.isArray(oldQueue)
  )
    ? {
      unsubscribe,
      fetchingQueue: false,
      error: null,
      userQueue: newQueue,
      totalQueue: newQueue.length,
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