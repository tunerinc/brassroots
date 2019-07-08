'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../AddNewPlaylistUser';
import * as types from '../types';

describe('add new playlist user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_NEW_PLAYLIST_USER', () => {
    const userIDOne: string = 'foo';
    const userIDTwo: string = 'bar';

    expect(reducer(initialState, actions.addNewPlaylistUser(userIDOne)))
      .toEqual(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            members: [userIDOne],
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            members: [userIDOne],
          },
        },
        actions.addNewPlaylistUser(userIDTwo)
      )
    )
      .toEqual(
        {
          ...initialState,
          newPlaylist: {
            ...initialState.newPlaylist,
            members: [userIDOne, userIDTwo],
          },
        }
      );
  });
});