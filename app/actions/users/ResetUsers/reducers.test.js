'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/users';
import * as actions from '../ResetUsers';

describe('reset users reducer', () => {
  it('should handle RESET_USERS', () => {
    expect(
      reducer(
        {
          ...initialState,
          currentUserID: 'foo',
        },
        actions.resetUsers(),
      )
    )
      .toEqual(initialState);
  });
});