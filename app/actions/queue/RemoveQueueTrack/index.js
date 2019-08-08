'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveQueueTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Removes a track from a session's queue
 * 
 * @alias module:RemoveQueueTrack
 * @function removeQueueTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} queueID The Brassroots id of the queue track to remove
 * 
 * @returns {object}         Redux action with the type of REMOVE_QUEUE_TRACK and the id of the queue track to remove
 */
export function removeQueueTrack(
  queueID: string,
): Action {
  return {
    type: types.REMOVE_QUEUE_TRACK,
    queueID,
  };
}