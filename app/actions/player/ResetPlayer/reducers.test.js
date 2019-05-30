'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from '../ResetPlayer';

describe('reset player reducer', () => {
  it('should handle RESET_PLAYER', () => {
    expect(
      reducer(
        {
          ...initialState,
          currentTrackID: 'foo',
          progress: 1000,
        },
        actions.resetPlayer()
      )
    )
      .toEqual(initialState);
  });
});