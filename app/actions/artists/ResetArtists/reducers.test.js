'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/artists';
import * as actions from '../ResetArtists';

describe('reset artists reducer', () => {
  it('should handle RESET_ARTISTS', () => {
    expect(
      reducer(
        {
          ...initialState,
          userArtists: ['foo', 'bar'],
          isFetching: true,
        },
        actions.resetArtists()
      )
    )
      .toStrictEqual(initialState);
  });
});