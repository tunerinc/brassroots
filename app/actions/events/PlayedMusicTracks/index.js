'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PlayedMusicTracks
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user has played music tracks
 * 
 * @alias module:PlayedMusicTracks
 * @function playedMusicTracks
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
 * @param {string} event.sourceMusicType
 * @param {string} event.sourceMusicId
 * 
 * @returns {object} Redux action with the type of PLAYED_MUSIC_TRACKS and the event data
 */
export function playedMusicTracks(
  event: ?Event,
): Action {
  return {
    type: types.PLAYED_MUSIC_TRACKS,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_PLAYED_MUSIC_TRACKS' }
        : {}
      )
    },
  };
}