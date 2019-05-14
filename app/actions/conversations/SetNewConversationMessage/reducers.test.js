'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/conversations';
import * as actions from '../SetNewConversationMessage';
import * as types from '../types';

describe('set new conversation message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_CONVERSATION_MESSAGE', () => {
    const message: string = 'foo';

    expect(reducer(initialState, actions.setNewConversationMessage(message)))
      .toEqual(
        {
          ...initialState,
          newConversation: {
            ...initialState.newConversation,
            message,
          },
        }
      );
  });
});