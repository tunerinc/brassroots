'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddPlaylists';
import * as types from '../types';
import {
  type Playlist,
  type Action,
} from '../../../reducers/playlists';

describe('add playlists action creator', () => {
  it('creates action adding playlists', () => {
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
      },
      bar: {
        id: 'bar',
        name: 'bar',
        ownerID: 'bar',
        ownerType: 'bar',
        small: 'foo',
        medium: 'foo',
        large: 'foo',
        mode: 'bar',
        public: true,
      },
    };

    const expectedAction: Action = {
      type: types.ADD_PLAYLISTS,
      playlists,
    };
    
    expect(actions.addPlaylists(playlists)).toEqual(expectedAction);
  });
});