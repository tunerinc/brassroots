'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Action,
  type Event,
} from '../../../reducers/events';
import * as actions from '../SkippedTrack';

describe('skipped track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle SKIPPED_TRACK', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      trackId: '6be86adcbf6a',
      sourceType: 'PLAYLIST',
      sourceId: '6be86adc-bf6a-4ada-971b-4388decc7a11',
      skippedStartedSeconds: 10,
      skippedEndSeconds: 35,
    };

    expect(reducer(initialState, actions.skippedTrack())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.skippedTrack(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_SKIPPED_TRACK',
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
              eventType: 'USER_SKIPPED_TRACK',
            },
          ],
        },
        actions.skippedTrack(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_SKIPPED_TRACK',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_SKIPPED_TRACK',
            },
          ],
        }
      );
  });
});