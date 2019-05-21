'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SentChatMessage
 */

import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

/**
 * Adds an event for when the current user sends a chat message
 * 
 * @alias module:SentChatMessage
 * @function sentChatMessage
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
 * @param {string} event.message
 * @param {string} event.destinationType
 * @param {string} event.destinationId
 * 
 * @returns {object} Redux action with the type of SENT_CHAT_MESSAGE and the event data
 */
export function sentChatMessage(
  event: ?Event,
): Action {
  return {
    type: types.SENT_CHAT_MESSAGE,
    event: {
      ...(event
        ? { ...event, eventVersion: '1-0-0', eventType: 'USER_SENT_CHAT_MESSAGE' }
        : {}
      )
    },
  };
}