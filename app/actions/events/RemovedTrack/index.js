'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemovedTrack
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user has removed a track from the queue
 * 
 * @alias module:RemovedTrack
 * @function removedTrack
 * 
 * @version 1.0.0
 * 
 * @author Aldo Gonzalez <aldo@tuenrinc.com>
 * 
 * @param {object} event 
 * @param {number} event.eventTime
 * @param {number} event.localTime
 * @param {string} [event.locationLatitude]
 * @param {string} [event.locationLongitude]
 * @param {string} event.trackId
 * @param {string} event.userId
 * @param {string} event.sourceType
 * @param {string} event.sourceId
 * 
 * @returns {object} Redux action with the type of REMOVED_TRACK and the event data
 */
export function removedTrack(
  event: ?Event,
): Action {
  return {
    type: types.REMOVED_TRACK,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_REMOVED_TRACK' }
        : {}
      )
    },
  };
}