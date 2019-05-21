'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddAlbums';
import * as types from '../types';
import {
  type Action,
  type Album,
} from '../../../reducers/albums';

describe('add albums action creator', () => {
  it('creates action to add albums', () => {
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
    const expectedAction: Action = {
      type: types.ADD_ALBUMS,
      albums,
    };
    
    expect(actions.addAlbums(albums)).toEqual(expectedAction);
  });
});