'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddedTrack
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for an added track to a session's queue
 * 
 * @alias module:AddedTrack
 * @function addedTrack
 * 
 * @version 1.0.0
 * 
 * @author Aldo Gonzalez <aldo@tuenrinc.com>
 * 
 * @param {object} event 
 * @param {number} event.eventTime
 * @param {number} event.localTime
 * @param {string} event.trackId
 * @param {string} [event.locationLatitude]
 * @param {string} [event.locationLongitude]
 * @param {string} event.userId
 * @param {string} event.sourceType
 * @param {string} event.sourceId
 * @param {string} event.destinationType
 * @param {string} event.destinationId
 * 
 * @returns {object} Redux action with the type of ADDED_TRACK and the event data
 */
export function addedTrack(
  event: ?Event,
): Action {
  return {
    type: types.ADDED_TRACK,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_ADDED_TRACK' }
        : {}
      )
    },
  };
}