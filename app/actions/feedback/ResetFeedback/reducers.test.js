'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/feedback';
import * as actions from '../ResetFeedback';

describe('reset feedback reducer', () => {
  it('should handle RESET_FEEDBACK', () => {
    expect(
      reducer(
        {
          ...initialState,
          message: 'foo',
          sending: true,
        },
        actions.resetFeedback()
      )
    )
      .toStrictEqual(initialState);
  });
});