'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type ChatMessage,
} from '../../../reducers/chat';
import * as actions from '../AddChatMessages';

describe('add chat messages reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_CHAT_MESSAGES', () => {
    const messages: {
      [id: string]: ChatMessage,
    } = {
      'foo': {
        id: 'foo',
        text: 'foo',
        userID: 'foo',
        timestamp: 'foo',
      },
      'bar': {
        id: 'bar',
        text: 'bar',
        userID: 'bar',
        timestamp: 'bar',
      },
    };

    expect(reducer(initialState, actions.addChatMessages(messages)))
      .toStrictEqual(
        {
          ...initialState,
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
        }
      );
  });
});