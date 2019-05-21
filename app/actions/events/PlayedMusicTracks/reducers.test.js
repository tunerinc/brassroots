'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Event,
} from '../../../reducers/events';
import * as actions from '../PlayedMusicTracks';

describe('played music tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PLAYED_MUSIC_TRACKS', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      sourceMusicType: 'PLAYLIST',
      sourceMusicId: '6be86adc-bf6a-4ada-971b-4388decc7a11',
    };

    expect(reducer(initialState, actions.playedMusicTracks())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.playedMusicTracks(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_PLAYED_MUSIC_TRACKS',
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
              eventType: 'USER_PLAYED_MUSIC_TRACKS',
            },
          ],
        },
        actions.playedMusicTracks(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_PLAYED_MUSIC_TRACKS',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_PLAYED_MUSIC_TRACKS',
            },
          ],
        }
      );
  });
});