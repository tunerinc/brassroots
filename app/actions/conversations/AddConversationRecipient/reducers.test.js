'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/conversations';
import * as actions from '../AddConversationRecipient';
import * as types from '../types';

describe('add conversation recipient reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CONVERSATION_RECIPIENT', () => {
    const recipientIDOne: string = 'foo';
    const recipientIDTwo: string = 'bar';

    expect(reducer(initialState, actions.addConversationRecipient(recipientIDOne)))
      .toEqual(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            recipients: [recipientIDOne],
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            recipients: [recipientIDOne],
          },
        },
        actions.addConversationRecipient(recipientIDTwo)
      )
    )
      .toEqual(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            recipients: [recipientIDOne, recipientIDTwo],
          },
        }
      );
  });
});