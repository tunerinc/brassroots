'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewGroupName';
import * as types from '../types';
import {type Action} from '../../../reducers/groups';

describe('set new group name action creator', () => {
  it('creates action setting the name for the new group being created by the current user', () => {
    const name: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_GROUP_NAME,
      name,
    };

    expect(actions.setNewGroupName(name)).toEqual(expectedAction);
  });
});