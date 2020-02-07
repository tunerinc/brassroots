'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Event,
} from '../../../reducers/events';
import * as actions from '../EditedPlaylistSettings';

describe('added track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle EDITED_PLAYLIST_SETTINGS', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      oldMode: 'DJ',
      newMode: 'PARTY',
    };

    expect(reducer(initialState, actions.editedPlaylistSettings())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.editedPlaylistSettings(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_EDITED_PLAYLIST_SETTINGS',
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
              eventType: 'USER_EDITED_PLAYLIST_SETTINGS',
            },
          ],
        },
        actions.editedPlaylistSettings(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_EDITED_PLAYLIST_SETTINGS',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_EDITED_PLAYLIST_SETTINGS',
            },
          ],
        }
      );
  });
});