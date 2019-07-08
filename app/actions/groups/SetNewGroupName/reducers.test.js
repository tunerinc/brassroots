'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/groups';
import * as actions from '../SetNewGroupName';
import * as types from '../types';

describe('set new group name reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_GROUP_NAME', () => {
    const name: string = 'foo';

    expect(reducer(initialState, actions.setNewGroupName(name)))
      .toEqual(
        {
          ...initialState,
          newGroup: {
            ...initialState.newGroup,
            name,
          }
        }
      );
  });
});