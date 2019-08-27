'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateSearch';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/search';

describe('update search synchronous action creator', () => {
  it('creates action to update the search state', () => {
    const updates: State = {query: 'foo'};
    const expectedAction: Action = {
      type: types.UPDATE_SEARCH,
      updates,
    }

    expect(actions.updateSearch(updates)).toStrictEqual(expectedAction);
  });
});