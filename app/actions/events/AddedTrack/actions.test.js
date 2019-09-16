'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddedTrack';
import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

describe('added track action creator', () => {
  it('creates action for an added track event type', () => {
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
    const expectedAction: Action = {
      type: types.ADDED_TRACK,
      event: {
        ...event,
        eventVersion: '1-0-0',
        eventType: 'USER_ADDED_TRACK',
      },
    };

    expect(actions.addedTrack(event)).toStrictEqual(expectedAction);
  });
});