'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Event,
} from '../../../reducers/events';
import * as actions from '../ClickedUsersHyperlink';

describe('clicked users hyperlink reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CLICKED_USERS_HYPERLINK', () => {
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

    expect(reducer(initialState, actions.clickedUsersHyperlink())).toStrictEqual(initialState);

    expect(reducer(initialState, actions.clickedUsersHyperlink(event)))
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_CLICKED_USERS_HYPERLINK',
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
              eventType: 'USER_CLICKED_USERS_HYPERLINK',
            },
          ],
        },
        actions.clickedUsersHyperlink(event),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          batch: [
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_CLICKED_USERS_HYPERLINK',
            },
            {
              ...event,
              eventVersion: '1-0-0',
              eventType: 'USER_CLICKED_USERS_HYPERLINK',
            },
          ],
        }
      );
  });
});