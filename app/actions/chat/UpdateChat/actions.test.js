'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateChat';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/chat';

describe('update chat synchronous action creator', () => {
  it('creates action to update the chat state', () => {
    const updates: State = {message: 'foo'};
    const expectedAction: Action = {
      type: types.UPDATE_CHAT,
      updates,
    }

    expect(actions.updateChat(updates)).toStrictEqual(expectedAction);
  });
});