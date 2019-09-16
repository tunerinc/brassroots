'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateConversations';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/conversations';

describe('update conversations synchronous action creator', () => {
  it('creates action to update the conversations state', () => {
    const updates: State = {newConversation: {text: 'foo', users: ['foo']}};
    const expectedAction: Action = {
      type: types.UPDATE_CONVERSATIONS,
      updates,
    }

    expect(actions.updateConversations(updates)).toStrictEqual(expectedAction);
  });
});