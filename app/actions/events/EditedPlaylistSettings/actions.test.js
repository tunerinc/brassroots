'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../EditedPlaylistSettings';
import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

describe('edited playlist settings action creator', () => {
  it('creates action for an edited playlist settings event type', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      oldMode: 'DJ',
      newMode: 'PARTY',
    };
    const expectedAction: Action = {
      type: types.EDITED_PLAYLIST_SETTINGS,
      event: {
        ...event,
        eventVersion: '1-0-0',
        eventType: 'USER_EDITED_PLAYLIST_SETTINGS',
      },
    };

    expect(actions.editedPlaylistSettings(event)).toStrictEqual(expectedAction);
  });
});