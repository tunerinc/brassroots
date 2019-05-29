'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from '../ResetQueue';

describe('reset queue reducer', () => {
  it('should handle RESET_QUEUE', () => {
    expect(
      reducer(
        {
          ...initialState,
          userQueue: ['foo', 'bar'],
          contextQueue: ['foo'],
        },
        actions.resetQueue()
      )
    )
      .toEqual(initialState);
  });
});