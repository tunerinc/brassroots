'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module EditedPlaylistSettings
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user has edited the settings for a playlist
 * 
 * @alias module:EditedPlaylistSettings
 * @function editedPlaylistSettings
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
 * @param {string} event.oldMode
 * @param {string} event.newMode
 * 
 * @returns {object} Redux action with the type of EDITED_PLAYLIST_SETTINGS and the event data
 */
export function editedPlaylistSettings(
  event: ?Event,
): Action {
  return {
    type: types.EDITED_PLAYLIST_SETTINGS,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_EDITED_PLAYLIST_SETTINGS' }
        : {}
      )
    },
  };
}