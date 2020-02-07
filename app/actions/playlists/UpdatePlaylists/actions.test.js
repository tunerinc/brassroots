'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdatePlaylists';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

describe('update playlists synchronous action creator', () => {
  it('creates action to update the playlists state', () => {
    const updates: State = {newPlaylist: {name: 'foo', members: ['foo']}};
    const expectedAction: Action = {
      type: types.UPDATE_PLAYLISTS,
      updates,
    }

    expect(actions.updatePlaylists(updates)).toStrictEqual(expectedAction);
  });
});