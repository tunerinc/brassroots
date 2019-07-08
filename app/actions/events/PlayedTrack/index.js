'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PlayedTrack
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user has played a track
 * 
 * @alias module:PlayedTrack
 * @function playedTrack
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
 * @param {string} event.userId
 * @param {string} event.trackId
 * @param {string} event.sourceType
 * @param {string} event.sourceId
 * @param {string} event.listenType
 * 
 * @returns {object} Redux action with the type of PLAYED_TRACK and the event data
 */
export function playedTrack(
  event: ?Event,
): Action {
  return {
    type: types.PLAYED_TRACK,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_PLAYED_TRACK' }
        : {}
      )
    },
  };
}