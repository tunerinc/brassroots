'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/chat';
import * as actions from '../RemoveChatMessage';

describe('remove chat message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle REMOVE_CHAT_MESSAGE', () => {
    const chatID: string = 'foo';

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
        actions.removeChatMessage(chatID),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentChat: ['bar'],
          totalChatMessages: 1,
          chatByID: {
            'bar': {
              id: 'bar',
              text: 'bar',
              userID: 'bar',
              timestamp: 'bar',
              error: null,
            },
          },
        },
      );
  });
});