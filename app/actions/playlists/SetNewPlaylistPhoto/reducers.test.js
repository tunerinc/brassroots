'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../SetNewPlaylistPhoto';
import * as types from '../types';

describe('set new playlist photo reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_PLAYLIST_PHOTO', () => {
    const uri: string = 'foo';

    expect(reducer(initialState, actions.setNewPlaylistPhoto(uri)))
      .toEqual(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            image: uri,
          },
        }
      );
  });
});