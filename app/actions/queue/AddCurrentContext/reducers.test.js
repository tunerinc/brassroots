'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Context,
} from '../../../reducers/queue';
import * as actions from '../AddCurrentContext';

describe('add current context reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_CURRENT_CONTEXT', () => {
    const context: Context = {
      id: 'foo',
      name: 'foo',
      type: 'foo',
      username: 'foo',
      position: 1,
    };

    expect(
      reducer(
        initialState,
        actions.addCurrentContext(context),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          context: {
            id: 'foo',
            name: 'foo',
            type: 'foo',
            username: 'foo',
            position: 1,
          },
        }
      );
  });
});