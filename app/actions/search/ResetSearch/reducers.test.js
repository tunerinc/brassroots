'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/search';
import * as actions from '../ResetSearch';

describe('reset search reducer', () => {
  it('should handle RESET_SEARCH', () => {
    expect(
      reducer(
        {
          ...initialState,
          userSearchResults: ['foo', 'bar'],
          isFetching: true,
        },
        actions.resetSearch(),
      )
    )
      .toStrictEqual(initialState);
  });
});