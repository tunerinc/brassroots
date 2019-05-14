'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/groups';
import * as actions from '../SetNewGroupPermissions';
import * as types from '../types';

describe('set new group permissions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_GROUP_PERMISSIONS', () => {
    const permission: string = 'foo';

    expect(reducer(initialState, actions.setNewGroupPermissions(permission)))
      .toEqual(
        {
          ...initialState,
          newGroup: {
            ...initialState.newGroup,
            join: permission,
          },
        }
      );
  });
});