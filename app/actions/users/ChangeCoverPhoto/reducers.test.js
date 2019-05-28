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

describe('change cover photo reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_COVER_PHOTO_REQUEST', () => {
    expect(reducer(initialState, actions.changeCoverPhotoRequest()))
      .toStrictEqual({...initialState, changingImage: 'cover'});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.changeCoverPhotoRequest(),
      )
    )
      .toStrictEqual({...initialState, changingImage: 'cover'});
  });

  it('should handle CHANGE_COVER_PHOTO_SUCCESS', () => {
    const currentUserID: string = 'foo';
    const coverImage: string = 'bar';
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
          changingImage: 'cover',
          usersByID: {
            [currentUserID]: {
              ...defaultUserState,
              id: currentUserID,
              coverImage: 'foo',
            },
          },
        },
        actions.changeCoverPhotoSuccess(),
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
              coverImage: 'foo',
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
          changingImage: 'cover',
          usersByID: {
            [currentUserID]: {
              ...defaultUserState,
              id: currentUserID,
              coverImage: 'foo',
            },
          },
        },
        actions.changeCoverPhotoSuccess(coverImage),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              ...defaultUserState,
              coverImage,
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
        {...initialState, changingImage: 'cover'},
        actions.changeCoverPhotoFailure(error),
      )
    )
      .toStrictEqual({...initialState, error});
  });
});