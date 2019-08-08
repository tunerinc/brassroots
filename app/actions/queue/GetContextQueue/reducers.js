'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetContextQueueReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Starts the request to get the context queue of a session
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingContext prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingContext: true, error: null});
}

/**
 * Confirms the success of getting the context queue of a session
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state               The Redux state
 * @param   {object}   action              The Redux action
 * @param   {string}   action.type         The type of Redux action
 * @param   {string[]} action.contextQueue The Spotify ids of the tracks from the context
 * 
 * @returns {object}                       The state with the updated contextQueue
 */
export function success(
  state: State,
  action: Action,
): State {
  const {contextQueue: oldQueue} = state;
  const {contextQueue} = action;
  const isFullQueue: boolean = contextQueue && contextQueue.length === 3 ? true : false;
  const updates = Array.isArray(oldQueue)
    ? {
      lastUpdated,
      fetchingContext: false,
      error: null,
      contextQueue: isFullQueue
        ? contextQueue
        : contextQueue
        ? oldQueue.concat(...contextQueue)
        : oldQueue,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get context queue failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get context queue failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingContext: false});
}