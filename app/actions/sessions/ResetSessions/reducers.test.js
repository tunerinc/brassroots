'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from '../ResetSessions';

describe('reset sessions reducer', () => {
  it('should handle RESET_SESSIONS', () => {
    expect(
      reducer(
        {
          ...initialState,
          trendingSessions: ['foo', 'bar'],
          isFetching: true,
        },
        actions.resetSessions()
      )
    )
      .toEqual(initialState);
  });
});