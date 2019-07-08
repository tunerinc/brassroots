'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemoveNewPlaylistUser';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('remove new playlist user action creator', () => {
  it('creates action removing a user from the new playlist being created by the current user', () => {
    const userID: string = 'foo';
    const expectedAction: Action = {
      type: types.REMOVE_NEW_PLAYLIST_USER,
      userID,
    };

    expect(actions.removeNewPlaylistUser(userID)).toEqual(expectedAction);
  });
});