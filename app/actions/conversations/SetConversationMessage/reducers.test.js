'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/conversations';
import * as actions from '../SetConversationMessage';
import * as types from '../types';

describe('set conversation message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_CONVERSATION_MESSAGE', () => {
    const conversationID: string = 'foo';
    const message: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          conversationsByID: {
            [conversationID]: {
              message: '',
            },
          },
        },
        actions.setConversationMessage(conversationID, message)
      )
    )
      .toEqual(
        {
          ...initialState,
          conversationsByID: {
            [conversationID]: {
              message,
            },
          },
        }
      );
  });
});