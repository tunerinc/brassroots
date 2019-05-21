'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SkippedTrack
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user has skipped to a new position within a track
 * 
 * @alias module:SkippedTrack
 * @function skippedTrack
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
 * @param {number} event.skippedStartSeconds
 * @param {number} event.skippedEndSeconds
 * 
 * @returns {object} Redux action with the type of SKIPPED_TRACK and the event data
 */
export function skippedTrack(
  event: ?Event,
): Action {
  return {
    type: types.SKIPPED_TRACK,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_SKIPPED_TRACK' }
        : {}
      )
    },
  };
}