'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/chat';
import * as actions from './actions';

describe('get chat reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_CHAT_REQUEST', () => {
    expect(reducer(initialState, actions.getChatRequest()))
      .toStrictEqual({...initialState, fetchingChat: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getChatRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingChat: true});
  });

  it('should handle GET_CHAT_SUCCESS', () => {
    const messages: Array<string> = ['foo', 'bar'];
    const chatUnsubscribe: () => void = () => {return;};

    expect(
      reducer(
        {...initialState, fetchingChat: true},
        actions.getChatSuccess(messages, chatUnsubscribe),
      ),
    )
      .toStrictEqual({...initialState, chatUnsubscribe, currentChat: messages.reverse()});
  });

  it('should handle GET_CHAT_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingChat: true},
        actions.getChatFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});