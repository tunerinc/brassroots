'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateUsers';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/users';

describe('update users synchronous action creator', () => {
  it('creates action to update the users state', () => {
    const updates: State = {currentUserID: 'foo'};
    const expectedAction: Action = {
      type: types.UPDATE_USERS,
      updates,
    }

    expect(actions.updateUsers(updates)).toStrictEqual(expectedAction);
  });
});