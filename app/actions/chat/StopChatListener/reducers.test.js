'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/chat';
import * as actions from './actions';

const chatUnsubscribe = () => {return};

describe('stop chat listener reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle STOP_CHAT_LISTENER_REQUEST', () => {
    expect(
      reducer(
        {...initialState, chatUnsubscribe},
        actions.stopChatListenerRequest(),
      ),
    )
      .toStrictEqual({...initialState, chatUnsubscribe});
  });

  it('should handle STOP_CHAT_LISTENER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, chatUnsubscribe},
        actions.stopChatListenerSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle STOP_CHAT_LISTENER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, chatUnsubscribe},
        actions.stopChatListenerFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, chatUnsubscribe});
  });
});