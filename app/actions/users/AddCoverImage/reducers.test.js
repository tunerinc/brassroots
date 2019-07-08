'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type User,
} from '../../../reducers/users';
import * as actions from '../AddCoverImage';

describe('add cover image reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_COVER_IMAGE', () => {
    const coverImage: string = 'foo';
    const userID: string = 'foo';
    const user: User = {
      id: 'foo',
      username: 'foo',
      spotifyUserID: 'foo',
      spotifyAccountStatus: 'foo',
      currentSessionID: 'foo',
      profileImage: 'foo',
      coverImage: '',
      bio: 'foo',
      location: 'foo',
      website: 'foo',
      favoriteTrackID: 'foo',
      topPlaylists: [],
      recentlyPlayed: [],
      mostPlayed: [],
      followers: [],
      totalFollowers: 0,
      following: [],
      totalFollowing: 0,
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {
          ...initialState,
          currentUserID: userID,
          usersByID: {[userID]: {...user}}
        },
        actions.addCoverImage(coverImage),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID: userID,
          usersByID: {[userID]: {...user, coverImage}},
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          currentUserID: userID,
          usersByID: {[userID]: {...user, coverImage: 'bar'}},
        },
        actions.addCoverImage(coverImage),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID: userID,
          usersByID: {[userID]: {...user, coverImage}},
        },
      );
  });
});