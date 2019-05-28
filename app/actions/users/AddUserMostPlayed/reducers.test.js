'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type User,
} from '../../../reducers/users';
import * as actions from '../AddUserMostPlayed';

describe('add user most played reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_USER_MOST_PLAYED', () => {
    const userID: string = 'foo';
    const mostPlayed: Array<string> = ['foo', 'bar'];
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
        actions.addUserMostPlayed(userID, mostPlayed),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, mostPlayed}},
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, mostPlayed: ['bar', 'foo', 'xyz']}},
        },
        actions.addUserMostPlayed(userID, mostPlayed),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, mostPlayed}},
        },
      );
  });
});