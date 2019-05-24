'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetChatMessage';
import * as types from '../types';
import {type Action} from '../../../reducers/chat';

describe('set chat message action creator', () => {
  it('creates action setting the chat message in a live session', () => {
    const message: string = 'bar';
    const expectedAction: Action = {
      type: types.SET_CHAT_MESSAGE,
      message,
    };
    
    expect(actions.setChatMessage(message)).toEqual(expectedAction);
  });
});