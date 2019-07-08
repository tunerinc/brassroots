'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type User,
} from '../../../reducers/users';
import * as actions from '../AddUserRecentlyPlayed';

describe('add user recently played reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_USER_RECENTLY_PLAYED', () => {
    const userID: string = 'foo';
    const recentlyPlayed: Array<string> = ['foo', 'bar'];
    const defaultUserState: User = {
      id: userID,
      username: 'foo',
      profileImage: 'foo',
      coverImage: 'foo',
      bio: '',
      location: '',
      website: '',
      followers: [],
      totalFollowers: 0,
      following: [],
      totalFollowing: 0,
      recentlyPlayed: [],
      mostPlayed: [],
      topPlaylists: [],
      favoriteTrackID: 'foo',
      currentSessionID: null,
      coords: null,
    };

    expect(
      reducer(
        {...initialState, usersByID: {[userID]: defaultUserState}},
        actions.addUserRecentlyPlayed(userID, recentlyPlayed),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, recentlyPlayed}},
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, recentlyPlayed: ['bar', 'foo', 'xyz']}},
        },
        actions.addUserRecentlyPlayed(userID, recentlyPlayed),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, recentlyPlayed}},
        },
      );
  });
});