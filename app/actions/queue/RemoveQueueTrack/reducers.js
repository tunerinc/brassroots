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
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.queueID The Brassroots id of the queue track to remove
 * 
 * @returns {object}                The state with the queue track removed in a session
 */
export function removeQueueTrack(
  state: State,
  action: Action,
): State {
  const {userQueue: oldQueue} = state;
  const {queueID} = action;
  const userQueue = Array.isArray(oldQueue) ? oldQueue.filter(obj => obj.id !== queueID) : oldQueue;
  const updates = Array.isArray(userQueue) && typeof queueID === 'string'
    ? {
      userQueue,
      lastUpdated,
      totalUserQueue: userQueue.length,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}