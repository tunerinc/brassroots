'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/users.js';
import * as actions from '../AddUserRecentTrack';

describe('add user recent track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_USER_RECENT_TRACK', () => {
    const currentUserID: string = 'foo';
    const trackIDOne: string = 'foo';
    const trackIDTwo: string = 'bar';
    const trackIDThree: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              recentlyPlayed: [],
            },
          },
        },
        actions.addUserRecentTrack(trackIDOne),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              recentlyPlayed: [trackIDOne],
            },
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              recentlyPlayed: [trackIDOne],
            },
          },
        },
        actions.addUserRecentTrack(trackIDTwo),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              recentlyPlayed: [trackIDTwo, trackIDOne],
            },
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              recentlyPlayed: [trackIDTwo, trackIDOne],
            },
          },
        },
        actions.addUserRecentTrack(trackIDThree),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              recentlyPlayed: [trackIDThree, trackIDTwo],
            },
          },
        }
      );
  });
});