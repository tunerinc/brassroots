'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemovedTrack';
import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

describe('removed track action creator', () => {
  it('creates action for a removed track event type', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      trackId: '6be86adcbf6a',
      sourceType: 'PLAYLIST',
      sourceId: '6be86adc-bf6a-4ada-971b-4388decc7a11',
    };
    const expectedAction: Action = {
      type: types.REMOVED_TRACK,
      event: {
        ...event,
        eventVersion: '1-0-0',
        eventType: 'USER_REMOVED_TRACK',
      },
    };

    expect(actions.removedTrack(event)).toStrictEqual(expectedAction);
  });
});