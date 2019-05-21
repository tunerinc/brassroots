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
import * as actions from '../ViewedMusicInfo';

describe('viewed music info reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle VIEWED_MUSIC_INFO', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      sourceMusicType: 'PLAYLIST',
      sourceMusicId: '6be86adc-bf6a-4ada-971b-4388decc7a11',
    };

    expect(reducer(initialState, actions.viewedMusicInfo())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.viewedMusicInfo(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_VIEWED_MUSIC_INFO',
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
              eventType: 'USER_VIEWED_MUSIC_INFO',
            },
          ],
        },
        actions.viewedMusicInfo(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_VIEWED_MUSIC_INFO',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_VIEWED_MUSIC_INFO',
            },
          ],
        }
      );
  });
});