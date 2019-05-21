'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Event,
} from '../../../reducers/events';
import * as actions from '../AddedTrack';

describe('added track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADDED_TRACK', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      trackId: '6be86adcbf6a',
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      sourceType: 'PLAYLIST',
      sourceId: '6be86adc-bf6a-4ada-971b-4388decc7a11',
      destinationType: 'PLAYLIST',
      destinationId: '6be86adc-bf6a-4ada-971b-4388decc7a1',
    };

    expect(reducer(initialState, actions.addedTrack())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.addedTrack(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_ADDED_TRACK',
            }
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
              eventType: 'USER_ADDED_TRACK',
            },
          ],
        },
        actions.addedTrack(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_ADDED_TRACK',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_ADDED_TRACK',
            },
          ],
        }
      );
  });
});