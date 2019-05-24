'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/chat';
import * as actions from '../SetChatMessage';

describe('set chat message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_CHAT_MESSAGE', () => {
    const message: string = 'bar';

    expect(
      reducer(
        {
          ...initialState,
          message: 'foo',
        },
        actions.setChatMessage(message),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          message: 'bar',
        },
      );
  });
});