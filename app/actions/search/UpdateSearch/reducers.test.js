'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/search';
import * as actions from '../UpdateSearch';

describe('update search reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_SEARCH', () => {
    const updates: State = {query: 'foo'};
    const expectedState: State = {...initialState, query: 'foo'};
    expect(reducer(initialState, actions.updateSearch(updates))).toStrictEqual(expectedState);
  });
});