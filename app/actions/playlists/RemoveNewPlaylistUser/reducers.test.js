'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../RemoveNewPlaylistUser';
import * as types from '../types';

describe('remove new playlist user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REMOVE_NEW_PLAYLIST_USER', () => {
    const userIDOne: string = 'foo';
    const userIDTwo: string = 'bar';

    expect(
      reducer(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            members: [userIDOne, userIDTwo],
          },
        },
        actions.removeNewPlaylistUser(userIDOne)
      )
    )
      .toEqual(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            members: [userIDTwo],
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            members: [userIDTwo],
          },
        },
        actions.removeNewPlaylistUser(userIDTwo)
      )
    )
      .toEqual(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            members: [],
          },
        }
      );
  });
});