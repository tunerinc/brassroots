'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveQueueTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Removes a single track from the queue in a session
 * 
 * @function removeQueueTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state              The Redux state
 * @param   {object}  action             The Redux action
 * @param   {string}  action.type        The type of Redux action
 * @param   {string}  action.queueID     The Brassroots id of the queue track to remove
 * @param   {boolean} action.removeTrack Whether to remove the cached track information on top of removing from user queue
 * 
 * @returns {object}                     The state with the queue track removed in a session
 */
export function removeQueueTrack(
  state: State,
  action: Action,
): State {
  const {userQueue: oldQueue, queueByID} = state;
  const {queueID, removeTrack} = action;
  const userQueue = Array.isArray(oldQueue) ? oldQueue.filter(id => id !== queueID) : oldQueue;
  const updates = Array.isArray(userQueue) && typeof queueID === 'string' && typeof queueByID === 'object'
    ? {
      userQueue,
      lastUpdated,
      totalQueue: userQueue.length,
      error: null,
      queueByID: removeTrack
        ? userQueue.reduce((obj, key) => updateObject(obj, {[key]: queueByID[key]}), {})
        : {...queueByID},
    }
    : {};

  return updateObject(state, updates);
}