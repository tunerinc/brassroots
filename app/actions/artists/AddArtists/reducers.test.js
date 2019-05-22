'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {
  initialState,
  lastUpdated,
  type Artist,
} from '../../../reducers/artists';
import * as actions from '../AddArtists';

describe('add artists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_ARTISTS', () => {
    const artists: {
      +[id: string]: Artist,
    } = {
      foo: {
        id: 'foo',
        name: 'foo',
        userTracks: [],
        tracks: ['foo'],
        userAlbums: [],
        albums: ['foo'],
        small: 'foo',
        medium: 'foo',
        large: 'foo',
      },
      bar: {
        id: 'bar',
        name: 'bar',
        userTracks: [],
        tracks: ['bar'],
        userAlbums: [],
        albums: ['bar'],
        small: 'bar',
        medium: 'bar',
        large: 'bar',
      },
    };
    expect(reducer(initialState, actions.addArtists(artists)))
      .toStrictEqual(
        {
          ...initialState,
          lastUpdated,
          totalArtists: 2,
          fetchingArtists: false,
          error: null,
          artistsByID: {
            ...initialState.artistsByID,
            foo: {
              ...artists.foo,
              lastUpdated,
              topAlbums: [],
              topListeners: [],
              topPlaylists: [],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
            },
            bar: {
              ...artists.bar,
              lastUpdated,
              topAlbums: [],
              topListeners: [],
              topPlaylists: [],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
            },
          },
        }
      );
  });
});