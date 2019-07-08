'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ClearNewPlaylist';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('clear new playlist action creator', () => {
  it('creates action clearing the info in a new playlist', () => {
    const expectedAction: Action = {
      type: types.CLEAR_NEW_PLAYLIST,
    };
    
    expect(actions.clearNewPlaylist()).toEqual(expectedAction);
  });
});