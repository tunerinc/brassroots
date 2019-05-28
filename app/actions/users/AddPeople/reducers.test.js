'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {
  initialState,
  type User,
} from '../../../reducers/users';
import * as actions from '../AddPeople';

describe('add people reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_PEOPLE', () => {
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
        spotifyAccountStatus: 'premium',
        coords: null,
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
        spotifyAccountStatus: 'premium',
        coords: null,
      },
    };

    expect(reducer(initialState, actions.addPeople(people)))
      .toEqual(
        {
          ...initialState,
          usersByID: {
            foo: {
              ...people.foo,
              lastUpdated: initialState.lastUpdated,
            },
            bar: {
              ...people.bar,
              lastUpdated: initialState.lastUpdated,
            },
          },
        }
      );
  });
});