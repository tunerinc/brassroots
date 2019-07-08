'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/users.js';
import * as actions from '../AddFavoriteTrack';

describe('add favorite track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_FAVORITE_TRACK', () => {
    const favoriteTrackIDOne: string = 'foo';
    const favoriteTrackIDTwo: string = 'bar';
    const currentUserID: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              favoriteTrackID: null,
              mostPlayed: [],
              topPlaylists: [],
              recentlyPlayed: [],
            },
          },
        },
        actions.addFavoriteTrack(favoriteTrackIDOne),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              favoriteTrackID: favoriteTrackIDOne,
              mostPlayed: [],
              topPlaylists: [],
              recentlyPlayed: [],
            },
          },
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              favoriteTrackID: favoriteTrackIDOne,
              mostPlayed: [],
              topPlaylists: [],
              recentlyPlayed: [],
            },
          },
        },
        actions.addFavoriteTrack(favoriteTrackIDTwo),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID,
          usersByID: {
            [currentUserID]: {
              id: currentUserID,
              favoriteTrackID: favoriteTrackIDTwo,
              mostPlayed: [],
              topPlaylists: [],
              recentlyPlayed: [],
            },
          },
        },
      );
  });
});