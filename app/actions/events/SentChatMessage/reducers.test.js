'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Event,
} from '../../../reducers/events';
import * as actions from '../SentChatMessage';

describe('sent chat message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle SENT_CHAT_MESSAGE', () => {
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

    expect(reducer(initialState, actions.sentChatMessage())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.sentChatMessage(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_SENT_CHAT_MESSAGE',
            },
          ],
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_SENT_CHAT_MESSAGE',
            },
          ],
        },
        actions.sentChatMessage(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_SENT_CHAT_MESSAGE',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_SENT_CHAT_MESSAGE',
            },
          ],
        }
      );
  });
});