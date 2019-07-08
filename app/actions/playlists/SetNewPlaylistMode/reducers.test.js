'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../SetNewPlaylistMode';
import * as types from '../types';

describe('set new playlist mode reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_PLAYLIST_USER', () => {
    const mode: string = 'vip';

    expect(reducer(initialState, actions.setNewPlaylistMode(mode)))
      .toEqual(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            mode,
          }
        }
      );
  });
});