'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddNewPlaylistUser';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('add new playlist user action creator', () => {
  it('creates action adding a new user to the playlist being created by the current user', () => {
    const userID: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_NEW_PLAYLIST_USER,
      userID,
    };

    expect(actions.addNewPlaylistUser(userID)).toEqual(expectedAction);
  });
});