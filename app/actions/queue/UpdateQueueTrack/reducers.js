'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateQueueTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleTrack,
  type QueueTrack,
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Updates a single queue track with new values
 * 
 * @function updateSingleTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state                       The Redux state
 * @param   {object}  action                      The Redux action
 * @param   {string}  action.type                 The type of Redux action
 * @param   {string}  action.queueID              The Brassroots id of the queue track
 * @param   {object}  action.updates              The updates to make to the single queue track
 * @param   {number}  [action.updates.totalLikes] The new total amount of likes the queue track has
 * @param   {boolean} [action.updates.changeLike] Whether the like status for the current user is changing on the queue track
 * 
 * @returns {object}                              The state of the single queue track with new values added
 */
export function updateSingleTrack(
  state: QueueTrack,
  action: Action,
): QueueTrack {
  const {liked, totalLikes: oldTotal} = state;
  const {updates} = action;
  const changes = updates && typeof liked === 'boolean' && typeof oldTotal === 'number'
    ? {
      liked: updates.changeLike ? !liked : liked,
      totalLikes: updates.totalLikes || oldTotal,
    }
    : {};

  return updateObject(state, changes);
}

/**
 * Updates a single queue track with new values
 * 
 * @function updateQueueTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state                       The Redux state
 * @param   {object}  action                      The Redux action
 * @param   {string}  action.type                 The type of Redux action
 * @param   {string}  action.queueID              The Brassroots id of the queue track to update with new values
 * @param   {object}  action.updates              The updates to make to the single queue track
 * @param   {number}  [action.updates.totalLikes] The new total amount of likes the single queue track has
 * @param   {boolean} [action.updates.changeLike] Whether the like status of the queue track is being changed for the current user
 * 
 * @returns {object}                              The state with the updates made to the single queue track
 */
export function updateQueueTrack(
  state: State,
  action: Action,
): State {
  const {queueByID} = state;
  const {queueID} = action;
  const updates = typeof queueID === 'string' && typeof queueByID === 'object'
    ? {
      lastUpdated,
      error: null,
      queueByID: updateObject(queueByID, {
        [queueID]: singleTrack(queueByID[queueID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}