'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type User,
} from '../../../reducers/users';
import * as actions from './actions';

describe('change profile photo reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_COVER_PHOTO_REQUEST', () => {
    expect(reducer(initialState, actions.changeProfilePhotoRequest()))
      .toStrictEqual({...initialState, changingImage: 'profile'});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.changeProfilePhotoRequest(),
      )
    )
      .toStrictEqual({...initialState, changingImage: 'profile'});
  });

  it('should handle CHANGE_COVER_PHOTO_SUCCESS', () => {
    const currentUserID: string = 'foo';
    const profileImage: string = 'bar';
    const defaultUserState: User = {
      coords: null,
      currentSessionID: null,
      favoriteTrackID: null,
      topPlaylists: [],
      recentlyPlayed: [],
      mostPlayed: [],
      followers: [],
      totalFollowers: 0,
      following: [],
      totalFollowing: 0,
    };

    expect(
      reducer(
        {
          ...initialState,
          currentUserID,
          changingImage: 'profile',
          usersByID: {
            [currentUserID]: {
              ...defaultUserState,
              id: currentUserID,
              profileImage: 'foo',
            },
          },
        },
        actions.changeProfilePhotoSuccess(),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              ...defaultUserState,
              id: currentUserID,
              profileImage: 'foo',
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          currentUserID,
          changingImage: 'profile',
          usersByID: {
            [currentUserID]: {
              ...defaultUserState,
              id: currentUserID,
              profileImage: 'foo',
            },
          },
        },
        actions.changeProfilePhotoSuccess(profileImage),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              ...defaultUserState,
              profileImage,
              id: currentUserID,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
      );
  });

  it('should handle CHANGE_COVER_PHOTO_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, changingImage: 'profile'},
        actions.changeProfilePhotoFailure(error),
      )
    )
      .toStrictEqual({...initialState, error});
  });
});