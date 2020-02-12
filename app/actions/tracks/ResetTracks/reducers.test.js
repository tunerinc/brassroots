'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from '../ResetTracks';

describe('reset tracks reducer', () => {
  it('should handle RESET_TRACKS', () => {
    expect(
      reducer(
        {
          ...initialState,
          userTracks: ['foo', 'bar'],
          isFetching: true,
        },
        actions.resetTracks()
      )
    )
      .toStrictEqual(initialState);
  });
});