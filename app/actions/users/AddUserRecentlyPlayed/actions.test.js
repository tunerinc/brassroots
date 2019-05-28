'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddUserRecentlyPlayed';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add user recently played synchronous action creator', () => {
  it('creates action to add the recently played tracks of a user', () => {
    const userID: string = 'foo';
    const recentlyPlayed: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.ADD_USER_RECENTLY_PLAYED,
      userID,
      recentlyPlayed,
    };

    expect(actions.addUserRecentlyPlayed(userID, recentlyPlayed)).toStrictEqual(expectedAction);
  });
});