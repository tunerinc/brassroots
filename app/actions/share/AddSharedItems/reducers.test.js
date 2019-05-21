'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type SharedItems,
} from '../../../reducers/share';
import * as actions from '../AddSharedItems';

describe('add shared items reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_SHARED_ITEMS', () => {
    const sharedItems: SharedItems = {
      foo: {
        id: 'foo',
        type: 'album',
      },
      bar: {
        id: 'bar',
        type: 'track',
      },
    };

    expect(reducer(initialState, actions.addSharedItems(sharedItems)))
      .toStrictEqual({...initialState, sharedItems});
  });
});