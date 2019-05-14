'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewConversationMessage';
import * as types from '../types';
import type {Action} from '../../../reducers/conversations';

describe('set new conversation message action creator', () => {
  it('creates acttion setting the message for a new conversation being created by the current user', () => {
    const message: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_CONVERSATION_MESSAGE,
      message,
    };

    expect(actions.setNewConversationMessage(message)).toEqual(expectedAction);
  });
});