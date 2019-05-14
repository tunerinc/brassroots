'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetConversationMessage';
import * as types from '../types';
import type {Action} from '../../../reducers/conversations';

describe('set conversation message action creator', () => {
  it('creates action to set the message for a conversation', () => {
    const conversationID: string = 'foo';
    const message: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_CONVERSATION_MESSAGE,
      conversationID,
      message,
    };

    expect(actions.setConversationMessage(conversationID, message)).toEqual(expectedAction);
  });
});