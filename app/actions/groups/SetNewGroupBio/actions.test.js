'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewGroupBio';
import * as types from '../types';
import {type Action} from '../../../reducers/groups';

describe('set new group bio action creator', () => {
  it('creates action setting the bio for a new group', () => {
    const bio: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_GROUP_BIO,
      bio,
    };

    expect(actions.setNewGroupBio(bio)).toEqual(expectedAction);
  });
});