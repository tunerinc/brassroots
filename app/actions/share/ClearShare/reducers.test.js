'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/share';
import * as actions from '../ClearShare';
import * as types from '../types';

describe('clear share reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CLEAR_SHARE', () => {
    expect(
      reducer(
        {
          ...initialState,
          message: 'foo',
          sharedItems: ['foo'],
          sharedItemsByID: {
            foo: {
              id: 'foo',
              type: 'foo',
            },
          },
          recipients: ['foo'],
        },
        actions.clearShare()
      )
    )
      .toEqual(initialState);
  });
});