'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddUserMostPlayed';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add user most played synchronous action creator', () => {
  it('creates action to add the most played tracks of a user', () => {
    const userID: string = 'foo';
    const mostPlayed: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.ADD_USER_MOST_PLAYED,
      userID,
      mostPlayed,
    };

    expect(actions.addUserMostPlayed(userID, mostPlayed)).toStrictEqual(expectedAction);
  });
});