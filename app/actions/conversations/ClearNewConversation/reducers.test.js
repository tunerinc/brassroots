'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/conversations';
import * as actions from '../ClearNewConversation';
import * as types from '../types';

describe('clear new conversation reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CLEAR_NEW_CONVERSATION', () => {
    expect(
      reducer(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            recipients: ['foo', 'bar'],
            message: 'foo',
          },
          isCreating: true,
        },
        actions.clearNewConversation()
      )
    )
      .toEqual(initialState);
  });
});