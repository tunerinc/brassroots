'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddCurrentUser';
import * as types from '../types';
import {
  type User,
  type Action,
} from '../../../reducers/users';

describe('add current user action creator', () => {
  it('creates action adding the current user', () => {
    const user: User = {
      id: 'foo',
      displayName: 'foo',
      spotifyAccountStatus: 'foo',
      profileImage: 'foo',
      coverImage: 'foo',
      bio: 'foo',
      birthdate: 'foo',
      location: 'foo',
      website: 'foo',
      email: 'foo',
    };

    const expectedAction: Action = {
      type: types.ADD_CURRENT_USER,
      user,
    };
    
    expect(actions.addCurrentUser(user)).toEqual(expectedAction);
  });
});