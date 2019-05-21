'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Event,
} from '../../../reducers/events';
import * as actions from '../PlayedTrack';

describe('played track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PLAYED_TRACK', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      trackId: '6be86adcbf6a',
      sourceType: 'PLAYLIST',
      sourceId: '6be86adc-bf6a-4ada-971b-4388decc7a11',
      listenType: 'ACTIVE',
    };

    expect(reducer(initialState, actions.playedTrack())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.playedTrack(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_PLAYED_TRACK',
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
              eventType: 'USER_PLAYED_TRACK',
            },
          ],
        },
        actions.playedTrack(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_PLAYED_TRACK',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_PLAYED_TRACK',
            },
          ],
        }
      );
  });
});