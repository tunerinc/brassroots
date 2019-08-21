'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Playlist,
} from '../../../reducers/playlists';
import * as actions from '../AddPlaylists';

describe('add playlists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_PLAYLISTS', () => {
    const playlists: {
      [id: string]: Playlist,
    } = {
      foo: {
        id: 'foo',
        name: 'foo',
        ownerID: 'foo',
        ownerType: 'foo',
        small: 'foo',
        medium: 'foo',
        large: 'foo',
        mode: 'foo',
        public: true,
        total: 1,
      },
      bar: {
        id: 'bar',
        name: 'bar',
        ownerID: 'bar',
        ownerType: 'bar',
        small: 'bar',
        medium: 'bar',
        large: 'bar',
        mode: 'bar',
        public: true,
        total: 1,
      },
    };

    expect(reducer(initialState, actions.addPlaylists(playlists)))
      .toEqual(
        {
          ...initialState,
          totalPlaylists: 2,
          lastUpdated: initialState.lastUpdated,
          playlistsByID: {
            foo: {
              id: 'foo',
              name: 'foo',
              ownerID: 'foo',
              ownerType: 'foo',
              small: 'foo',
              medium: 'foo',
              large: 'foo',
              mode: 'foo',
              public: true,
              total: 1,
              members: [],
              tracks: [],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              lastUpdated: initialState.lastUpdated,
            },
            bar: {
              id: 'bar',
              name: 'bar',
              ownerID: 'bar',
              ownerType: 'bar',
              small: 'bar',
              medium: 'bar',
              large: 'bar',
              mode: 'bar',
              public: true,
              members: [],
              tracks: [],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              total: 1,
              lastUpdated: initialState.lastUpdated,
            },
          },
        }
      );
  });
});