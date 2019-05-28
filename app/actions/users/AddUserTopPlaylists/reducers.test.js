'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type User,
} from '../../../reducers/users';
import * as actions from '../AddUserTopPlaylists';

describe('add user top playlists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_USER_TOP_PLAYLISTS', () => {
    const userID: string = 'foo';
    const topPlaylists: Array<string> = ['foo', 'bar'];
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
        actions.addUserTopPlaylists(userID, topPlaylists),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, topPlaylists}},
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, topPlaylists: ['bar', 'foo', 'xyz']}},
        },
        actions.addUserTopPlaylists(userID, topPlaylists),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          usersByID: {[userID]: {...defaultUserState, topPlaylists}},
        },
      );
  });
});