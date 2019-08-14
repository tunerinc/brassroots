'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddCurrentUser';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add current user action creator', () => {
  it('creates action adding the current user', () => {
    const currentUserID: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_CURRENT_USER,
      currentUserID,
    };
    
    expect(actions.addCurrentUser(currentUserID)).toEqual(expectedAction);
  });
});