'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemoveConversationRecipient';
import * as types from '../types';
import type {Action} from '../../../reducers/conversations';

describe('remove conversation recipient action creator', () => {
  it('creates action to remove a recipient from a new conversation', () => {
    const recipientID: string = 'bar';
    const expectedAction: Action = {
      type: types.REMOVE_CONVERSATION_RECIPIENT,
      recipientID,
    };
    
    expect(actions.removeConversationRecipient(recipientID)).toEqual(expectedAction);
  });
});