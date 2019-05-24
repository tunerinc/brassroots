'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/chat';
import * as actions from '../ResetChat';

describe('reset chat reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle RESET_CHAT', () => {
    expect(
      reducer(
        {
          ...initialState,
          currentChat: ['foo', 'bar'],
          totalChatMessages: 2,
          chatByID: {
            'foo': {
              id: 'foo',
              text: 'foo',
              userID: 'foo',
              timestamp: 'foo',
              error: null,
            },
            'bar': {
              id: 'bar',
              text: 'bar',
              userID: 'bar',
              timestamp: 'bar',
              error: null,
            },
          },
        },
        actions.resetChat(),
      )
    )
      .toStrictEqual(initialState);
  });
});