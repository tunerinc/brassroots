'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateQueueTrack
*/

import * as types from '../types';
import {
  type Action,
  type Updates,
} from '../../../reducers/queue';

/**
 * Adds updated properties of a single track in a session's queue
 * 
 * @alias module:UpdateQueueTrack
 * @function updateQueueTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}  queueID              The Brassroots id of the queue track to change the like status of the current user for
 * @param   {object}  updates              The updates to make to a single queue track
 * @param   {number}  [updates.totalLikes] The new total amount of likes a single queue track has
 * @param   {boolean} [updates.changeLike] Whether the current user is updating the liked prop of the queue track
 * 
 * @returns {object}                       Redux action with the type of CHANGE_LIKE_STATUS and the queue track to change the status on
 */
export function updateQueueTrack(
  queueID: string,
  updates: Updates,
): Action {
  return {
    type: types.UPDATE_QUEUE_TRACK,
    queueID,
    updates,
  };
}