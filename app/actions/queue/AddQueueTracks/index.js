'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddQueueTracks
 */

import * as types from '../types';
import {
  type QueueTrack,
  type Action,
} from '../../../reducers/queue';

/**
 * Adds queue tracks to Redux
 * 
 * @alias module:AddQueueTracks
 * @function addQueueTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} tracks The queue tracks to add to Redux
 * 
 * @returns {object}        Redux action with the type of ADD_QUEUE_TRACKS and the queue tracks to add
 */
export function addQueueTracks(
  tracks: {+[id: string]: QueueTrack},
): Action {
  return {
    type: types.ADD_QUEUE_TRACKS,
    tracks,
  };
}