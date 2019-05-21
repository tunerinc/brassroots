'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../PlayedMusicTracks';
import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

describe('played music tracks action creator', () => {
  it('creates action for a played music tracks event type', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      sourceMusicType: 'PLAYLIST',
      sourceMusicId: '6be86adc-bf6a-4ada-971b-4388decc7a11',
    };
    const expectedAction: Action = {
      type: types.PLAYED_MUSIC_TRACKS,
      event: {
        ...event,
        eventVersion: '1-0-0',
        eventType: 'USER_PLAYED_MUSIC_TRACKS',
      },
    };

    expect(actions.playedMusicTracks(event)).toStrictEqual(expectedAction);
  });
});