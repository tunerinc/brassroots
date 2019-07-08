'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {
  initialState,
  lastUpdated,
  type User,
} from '../../../reducers/users';
import * as actions from '../AddCurrentUser';

describe('add current user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CURRENT_USER', () => {
    const currentUserID: string = 'foo';
    const currentUser: User = {
      id: 'foo',
      displayName: 'foo',
      spotifyAccountStatus: 'foo',
      profileImage: 'foo',
      coverImage: 'foo',
      bio: 'foo',
      birthdate: 'foo',
      location: 'foo',
      website: 'foo',
      email: 'foo',
    };

    const user: User = {
      ...currentUser,
      lastUpdated,
      favoriteTrackID: null,
      coords: null,
      currentSessionID: null,
      topPlaylists: [],
      recentlyPlayed: [],
      mostPlayed: [],
      followers: [],
      following: [],
      totalFollowers: 0,
      totalFollowing: 0,
    };

    expect(reducer(initialState, actions.addCurrentUser(currentUser)))
      .toEqual(
        {
          ...initialState,
          lastUpdated,
          currentUserID,
          usersByID: {
            [currentUserID]: {...user},
          },
        }
      );
  });
});