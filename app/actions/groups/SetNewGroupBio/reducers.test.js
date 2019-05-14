'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/groups';
import * as actions from '../SetNewGroupBio';
import * as types from '../types';

describe('set new group bio reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_GROUP_BIO', () => {
    const bio: string = 'foo';

    expect(reducer(initialState, actions.setNewGroupBio(bio)))
      .toEqual(
        {
          ...initialState,
          newGroup: {
            ...initialState.newGroup,
            bio,
          }
        }
      );
  });
});