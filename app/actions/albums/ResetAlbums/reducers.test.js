'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/albums';
import * as actions from '../ResetAlbums';

describe('reset albums reducer', () => {
  it('should handle RESET_ALBUMS', () => {
    expect(
      reducer(
        {
          ...initialState,
          userAlbums: ['foo', 'bar'],
          isFetching: true,
        },
        actions.resetAlbums()
      )
    )
      .toStrictEqual(initialState);
  });
});