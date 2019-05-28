'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddPeople';
import * as types from '../types';
import {
  type User,
  type Action,
} from '../../../reducers/users';

describe('add people action creator', () => {
  it('creates action to add people', () => {
    const people: {
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
      type: types.ADD_PEOPLE,
      people,
    };

    expect(actions.addPeople(people)).toEqual(expectedAction);
  });
});