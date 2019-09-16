'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ClickedUsersHyperlink
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user taps another user's hyperlink
 * 
 * @alias module:ClickedUsersHyperlink
 * @function clickedUsersHyperlink
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
 * @param {string} event.sourceType
 * @param {string} event.sourceId
 * @param {string} event.hyperlink
 * 
 * @returns {object} Redux action with the type of CLICKED_USERS_HYPERLINK and the event data
 */
export function clickedUsersHyperlink(
  event: ?Event,
): Action {
  return {
    type: types.CLICKED_USERS_HYPERLINK,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_CLICKED_USERS_HYPERLINK' }
        : {}
      )
    },
  };
}