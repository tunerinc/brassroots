'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/search';
import * as actions from '../ClearSearchQuery';
import * as types from '../types';

describe('clear search query reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CLEAR_SEARCH_QUERY', () => {
    expect(
      reducer(
        {
          ...initialState,
          query: 'foo',
        },
        actions.clearSearchQuery(),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          query: '',
        },
      );
  });
});