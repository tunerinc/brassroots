'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddConversationRecipient';
import * as types from '../types';
import type {Action} from '../../../reducers/conversations';

describe('add conversation recipient action creator', () => {
  it('creates action to add a recipient to a new conversation', () => {
    const recipientID: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_CONVERSATION_RECIPIENT,
      recipientID,
    };
    
    expect(actions.addConversationRecipient(recipientID)).toEqual(expectedAction);
  });
});