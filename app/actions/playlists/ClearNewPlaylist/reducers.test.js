'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../ClearNewPlaylist';
import * as types from '../types';

describe('clear new playlist reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CLEAR_NEW_PLAYLIST', () => {
    expect(
      reducer(
        {
          ...initialState,
          newPlaylist: {
            members: ['foo'],
            name: 'foo',
            image: 'foo',
            mode: 'vip',
          },
        },
        actions.clearNewPlaylist()
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          newPlaylist: {
            members: [],
            name: '',
            image: '',
            mode: 'limitless',
          },
        }
      );
  });
});