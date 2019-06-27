'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type User,
} from '../../../reducers/users';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('get user image reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_USER_IMAGE_REQUEST', () => {
    expect(reducer(initialState, actions.getUserImageRequest()))
      .toStrictEqual({...initialState, fetchingImages: true});
  });

  it('should handle GET_USER_IMAGE_SUCCESS', () => {
    const userID: string = 'foo';
    const photo: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          usersByID: {
            [userID]: {
              lastUpdated: 'foo',
              id: userID,
              displayName: 'foo',
              profileImage: 'bar',
              coverImage: 'foo',
              bio: 'foo',
              location: 'foo',
              website: 'foo',
              spotifyAccountStatus: 'foo',
              coords: null,
              currentSessionID: null,
              favoriteTrackID: 'foo',
              topPlaylists: [],
              recentlyPlayed: [],
              mostPlayed: [],
              followers: [],
              totalFollowers: 0,
              following: [],
              totalFollowing: 0,
            },
          },
        },
        actions.getUserImageSuccess(userID, photo),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          usersByID: {
            [userID]: {
              lastUpdated: 'foo',
              id: userID,
              displayName: 'foo',
              profileImage: photo,
              coverImage: 'foo',
              bio: 'foo',
              location: 'foo',
              website: 'foo',
              spotifyAccountStatus: 'foo',
              coords: null,
              currentSessionID: null,
              favoriteTrackID: 'foo',
              topPlaylists: [],
              recentlyPlayed: [],
              mostPlayed: [],
              followers: [],
              totalFollowers: 0,
              following: [],
              totalFollowing: 0,
            },
          },
        },
      );
  });

  it('should handle GET_USER_IMAGE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {
          ...initialState,
          fetchingImages: true,
        },
        actions.getUserImageFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});