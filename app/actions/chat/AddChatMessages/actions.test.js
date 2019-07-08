'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddChatMessages';
import * as types from '../types';
import {
  type Action,
  type ChatMessage,
} from '../../../reducers/chat';

describe('add chat messages action creator', () => {
  it('creates action to add chat messages from a session', () => {
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

    const expectedAction: Action = {
      type: types.ADD_CHAT_MESSAGES,
      messages,
    };

    expect(actions.addChatMessages(messages)).toStrictEqual(expectedAction);
  });
});