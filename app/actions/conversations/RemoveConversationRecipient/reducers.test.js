'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/conversations';
import * as actions from '../RemoveConversationRecipient';
import * as types from '../types';

describe('remove conversation recipient reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REMOVE_CONVERSATION_RECIPIENT', () => {
    const recipientIDOne: string = 'foo';
    const recipientIDTwo: string = 'bar';

    expect(
      reducer(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            recipients: [recipientIDOne, recipientIDTwo],
          },
        },
        actions.removeConversationRecipient(recipientIDOne)
      )
    )
      .toEqual(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            recipients: [recipientIDTwo],
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            recipients: [recipientIDTwo],
          },
        },
        actions.removeConversationRecipient(recipientIDTwo)
      )
    )
      .toEqual(initialState);
  });
});