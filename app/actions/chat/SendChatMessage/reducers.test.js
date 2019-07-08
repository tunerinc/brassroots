'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/chat';
import * as actions from './actions';

describe('send chat message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle SEND_CHAT_MESSAGE_REQUEST', () => {
    expect(reducer(initialState, actions.sendChatMessageRequest()))
      .toStrictEqual({...initialState, sendingMessage: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.sendChatMessageRequest(),
      ),
    )
      .toStrictEqual({...initialState, sendingMessage: true});
  });

  it('should handle SEND_CHAT_MESSAGE_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, sendingMessage: true},
        actions.sendChatMessageSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle SEND_CHAT_MESSAGE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, sendingMessage: true},
        actions.sendChatMessageFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});