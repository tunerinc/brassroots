'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ClearSearchQuery';
import * as types from '../types';
import {type Action} from '../../../reducers/search';

describe('clear search query action creator', () => {
  it('creates action clearing the query for a search', () => {
    const expectedAction: Action = {
      type: types.CLEAR_SEARCH_QUERY,
    };
    
    expect(actions.clearSearchQuery()).toStrictEqual(expectedAction);
  });
});