'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/groups';
import * as actions from '../SetNewGroupLocation';
import * as types from '../types';

describe('set new group location reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_GROUP_LOCATION', () => {
    const location: string = 'foo';

    expect(reducer(initialState, actions.setNewGroupLocation(location)))
      .toEqual(
        {
          ...initialState,
          newGroup: {
            ...initialState.newGroup,
            location,
          },
        }
      );
  });
});