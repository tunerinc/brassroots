'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SentChatMessage';
import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

describe('sent chat message action creator', () => {
  it('creates action for a sent chat message event type', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      message: 'random message here',
      destinationType: 'PLAYLIST',
      destinationId: '6be86adc-bf6a-4ada-971b-4388decc7a1',
    };
    const expectedAction: Action = {
      type: types.SENT_CHAT_MESSAGE,
      event: {
        ...event,
        eventVersion: '1-0-0',
        eventType: 'USER_SENT_CHAT_MESSAGE',
      },
    };

    expect(actions.sentChatMessage(event)).toStrictEqual(expectedAction);
  });
});