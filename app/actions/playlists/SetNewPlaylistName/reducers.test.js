'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../SetNewPlaylistName';
import * as types from '../types';

describe('set new playlist name reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_PLAYLIST_NAME', () => {
    const name: string = 'foo';

    expect(reducer(initialState, actions.setNewPlaylistName(name)))
      .toEqual(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            name,
          },
        }
      );
  });
});