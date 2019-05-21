'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ViewedMusicInfo
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user has viewed more info on a piece of music
 * 
 * @alias module:ViewedMusicInfo
 * @function viewedMusicInfo
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
 * @returns {object} Redux action with the type of VIEWED_MUSIC_INFO and the event data
 */
export function viewedMusicInfo(
  event: ?Event,
): Action {
  return {
    type: types.VIEWED_MUSIC_INFO,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_VIEWED_MUSIC_INFO' }
        : {}
      )
    },
  };
}