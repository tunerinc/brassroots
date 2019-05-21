'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../PlayedTrack';
import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

describe('played track action creator', () => {
  it('creates action for a played track event type', () => {
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
    const expectedAction: Action = {
      type: types.PLAYED_TRACK,
      event: {
        ...event,
        eventVersion: '1-0-0',
        eventType: 'USER_PLAYED_TRACK',
      },
    };

    expect(actions.playedTrack(event)).toStrictEqual(expectedAction);
  });
});