'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/albums';
import updateObject from '../../../utils/updateObject';
import * as actions from '../AddAlbums';
import type {Album} from '../../../reducers/albums';

describe('add albums reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_ALBUMS', () => {
    const albums: {
      +[key: string]: Album,
    } = {
      foo: {
        id: 'foo',
        artists: [
          {id: 'foo', name: 'foo'},
        ],
        name: 'foo bar',
        small: 'foo',
        medium: 'foo',
        large: 'foo',
        userTracks: ['foo'],
        tracks: ['foo'],
      },
      bar: {
        id: 'bar',
        artists: [
          {id: 'foo', name: 'foo'},
        ],
        name: 'foo bar',
        small: 'foo',
        medium: 'foo',
        large: 'foo',
        userTracks: ['bar'],
        tracks: ['bar'],
      },
    };

    expect(reducer(initialState, actions.addAlbums(albums)))
      .toEqual(
        {
          ...initialState,
          totalAlbums: 2,
          albumsByID: Object.values(albums).reduce((obj, album) => {
            const albumToAdd = album && typeof album.id === 'string'
              ? {
                [album.id]: {
                  ...album,
                  topListeners: [],
                  topPlaylists: [],
                  topTracks: [],
                  totalPlays: 0,
                  userPlays: 0,
                  lastUpdated: initialState.lastUpdated,
                },
              }
              : {};

            return updateObject(obj, albumToAdd);
          }, {}),
        },
      );
  });
});