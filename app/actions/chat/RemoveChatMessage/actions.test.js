'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemoveChatMessage';
import * as types from '../types';
import {type Action} from '../../../reducers/chat';

describe('remove chat message action creator', () => {
  it('creates action to remove a chat message from the current session', () => {
    const chatID: string = 'foo';
    const expectedAction: Action = {
      type: types.REMOVE_CHAT_MESSAGE,
      chatID,
    };

    expect(actions.removeChatMessage(chatID)).toStrictEqual(expectedAction);
  });
});