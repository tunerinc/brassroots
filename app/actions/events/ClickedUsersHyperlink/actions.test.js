'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ClickedUsersHyperlink';
import * as types from '../types';
import {
  type Action,
  type Event,
} from '../../../reducers/events';

describe('clicked users hyperlink action creator', () => {
  it('creates action for a clicked users hyperlink event type', () => {
    const event: Event = {
      eventTime: 1539013155533,
      localTime: 1539013155533,
      locationLatitude: '64.26393',
      locationLongitude: '-2.55321',
      userId: 'test_user_1',
      sourceType: 'USER_PROFILE',
      sourceId: 'test_user_2',
      hyperlink: 'https://dev0.tuenrinc.com/as/',
    };
    const expectedAction: Action = {
      type: types.CLICKED_USERS_HYPERLINK,
      event: {
        ...event,
        eventVersion: '1-0-0',
        eventType: 'USER_CLICKED_USERS_HYPERLINK',
      },
    };

    expect(actions.clickedUsersHyperlink(event)).toStrictEqual(expectedAction);
  });
});