'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddArtists';
import * as types from '../types';
import {
  type Artist,
  type Action,
} from '../../../reducers/artists';

describe('add artists action creator', () => {
  it('creates action to add artists', () => {
    const artists: {
      +[id: string]: Artist,
    } = {
      foo: {
        id: 'foo',
        name: 'foo',
        userTracks: ['foo'],
        tracks: ['foo'],
        userAlbums: ['foo'],
        albums: ['foo'],
        small: 'foo',
        medium: 'foo',
        large: 'foo',
      },
      bar: {
        id: 'bar',
        name: 'bar',
        userTracks: ['bar'],
        tracks: ['bar'],
        userAlbums: ['bar'],
        albums: ['bar'],
        small: 'bar',
        medium: 'bar',
        large: 'bar',
      },
    };
    const expectedAction: Action = {
      type: types.ADD_ARTISTS,
      artists,
    };
    
    expect(actions.addArtists(artists)).toStrictEqual(expectedAction);
  });
});