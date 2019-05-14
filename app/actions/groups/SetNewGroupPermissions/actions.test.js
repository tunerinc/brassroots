'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewGroupPermissions';
import * as types from '../types';
import type {Action} from '../../../reducers/groups';

describe('set new group permissions action creator', () => {
  it('creates action setting the permissions for the new group being created by the current user', () => {
    const permission: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_GROUP_PERMISSIONS,
      permission,
    };

    expect(actions.setNewGroupPermissions(permission)).toEqual(expectedAction);
  });
});