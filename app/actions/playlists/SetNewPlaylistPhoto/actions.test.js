'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewPlaylistPhoto';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('set new playlist photo action creator', () => {
  it('creates action setting the photo uri for the new playlist being created by the current user', () => {
    const uri: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_PLAYLIST_PHOTO,
      uri,
    };

    expect(actions.setNewPlaylistPhoto(uri)).toEqual(expectedAction);
  });
});