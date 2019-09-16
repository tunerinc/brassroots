'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../ResetPlaylists';

describe('reset playlists reducer', () => {
  it('should handle RESET_PLAYLISTS', () => {
    expect(
      reducer(
        {
          ...initialState,
          userPlaylists: ['foo', 'bar'],
          isFetching: true,
        },
        actions.resetPlaylists(),
      )
    )
      .toStrictEqual(initialState);
  });
});