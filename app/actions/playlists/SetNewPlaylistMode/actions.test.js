'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewPlaylistMode';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('set new playlist mode action creator', () => {
  it('creates action setting the mode for the new playlist being created by the current user', () => {
    const mode: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_PLAYLIST_MODE,
      mode,
    };

    expect(actions.setNewPlaylistMode(mode)).toEqual(expectedAction);
  });
});