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
import * as actions from '../AddCurrentLocation';
import * as types from '../types';

describe('add current location reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CURRENT_LOCATION', () => {
    const location: {
      latitude: number,
      longitude: number,
    } = {
      latitude: 0,
      longitude: 0,
    };
    const currentUserID: string = 'foo';
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
          currentUserID,
          usersByID: {
            [currentUserID]: {...user},
          },
        },
        actions.addCurrentLocation(location),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              ...user,
              coords: {
                lat: location.latitude,
                lon: location.longitude,
              },
            },
          },
        }
      );
  });
});