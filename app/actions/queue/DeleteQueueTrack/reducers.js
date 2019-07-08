'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module DeleteQueueTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Starts the request to delete a track from the queue
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.queueID The Brassroots id of the queue track to delete
 * 
 * @returns {object}                The state with the queue track added to the deleting prop
 */
export function request(
  state: State,
  action: Action,
): State {
  const {deleting, failed} = state;
  const {queueID} = action;
  const updates = Array.isArray(deleting) && Array.isArray(failed) && typeof queueID === 'string'
    ? {
      deleting: deleting.concat(queueID),
      failed: failed.filter(id => id !== queueID),
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of the queue track being deleted
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.queueID The Brassroots id of the queue track that was deleted
 * 
 * @returns {object}                The state with the deleting prop updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {deleting} = state;
  const {queueID} = action;
  const updates = Array.isArray(deleting) && typeof queueID === 'string'
    ? {
      lastUpdated,
      deleting: deleting.filter(id => id !== queueID),
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the delete queue track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.queueID The Brassroots id of the queue track which failed to delete
 * 
 * @returns {object}                The state with the failed queue track added to the failed prop
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {deleting, failed} = state;
  const {queueID, error} = action;
  const updates = Array.isArray(deleting) && Array.isArray(failed) && typeof queueID === 'string' && error
    ? {
      error,
      deleting: deleting.filter(id => id !== queueID),
      failed: failed.concat(queueID),
    }
    : {};

  return updateObject(state, updates);
}