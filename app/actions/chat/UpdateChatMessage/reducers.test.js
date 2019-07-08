'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/chat';
import * as actions from '../UpdateChatMessage';

describe('update chat message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle UPDATE_CHAT_MESSAGE', () => {
    const chatID: string = 'foo';
    const updates: {text: string} = {text: 'bar'};

    expect(
      reducer(
        {
          ...initialState,
          currentChat: ['foo'],
          totalChatMessages: 1,
          chatByID: {
            'foo': {
              id: 'foo',
              text: 'foo',
              userID: 'foo',
              timestamp: 'foo',
              error: null,
            },
          },
        },
        actions.updateChatMessage(chatID, updates),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentChat: ['foo'],
          totalChatMessages: 1,
          chatByID: {
            'foo': {
              id: 'foo',
              text: 'bar',
              userID: 'foo',
              timestamp: 'foo',
              error: null,
            },
          },
        },
      );
  });
});