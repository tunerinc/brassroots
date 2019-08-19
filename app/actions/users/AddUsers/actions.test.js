'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddUsers';
import * as types from '../types';
import {
  type User,
  type Action,
} from '../../../reducers/users';

describe('add users action creator', () => {
  it('creates action to add users', () => {
    const users: {
      +[id: string]: User,
    } = {
      foo: {
        id: 'foo',
        displayName: 'foo',
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
        currentSessionID: 'foo',
      },
      bar: {
        id: 'bar',
        displayName: 'bar',
        profileImage: 'bar',
        coverImage: 'bar',
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
        favoriteTrackID: 'bar',
        currentSessionID: 'bar',
      },
    };
    const expectedAction: Action = {
      type: types.ADD_USERS,
      users,
    };

    expect(actions.addUsers(users)).toEqual(expectedAction);
  });
});