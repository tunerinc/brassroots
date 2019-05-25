'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewPlaylistName';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('set new playlist name action creator', () => {
  it('creates action setting the name for the new playlist being created by the current user', () => {
    const name: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_PLAYLIST_NAME,
      name,
    };

    expect(actions.setNewPlaylistName(name)).toEqual(expectedAction);
  });
});