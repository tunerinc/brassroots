'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddUserTopPlaylists';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add user top playlists synchronous action creator', () => {
  it('creates action to add the top playlists of a user', () => {
    const userID: string = 'foo';
    const topPlaylists: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.ADD_USER_TOP_PLAYLISTS,
      userID,
      topPlaylists,
    };

    expect(actions.addUserTopPlaylists(userID, topPlaylists)).toStrictEqual(expectedAction);
  });
});