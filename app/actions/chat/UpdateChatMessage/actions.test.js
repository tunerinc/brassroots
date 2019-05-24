'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateChatMessage';
import * as types from '../types';
import {type Action} from '../../../reducers/chat';

describe('update chat message action creator', () => {
  it('creates action to update a chat message with new information', () => {
    const chatID: string = 'foo';
    const updates: {text: string} = {text: 'foo'};
    const expectedAction = {
      type: types.UPDATE_CHAT_MESSAGE,
      chatID,
      updates,
    };

    expect(actions.updateChatMessage(chatID, updates)).toStrictEqual(expectedAction);
  });
});