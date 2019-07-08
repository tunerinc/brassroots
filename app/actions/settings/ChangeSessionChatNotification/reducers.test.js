'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change session chat notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_SESSION_CHAT_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changeSessionChatNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['session chat']});

    expect(
      reducer(
        {...initialState, failed: ['session chat']},
        actions.changeSessionChatNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['session chat']});
  });

  it('should handle CHANGE_SESSION_CHAT_NOTIFICATION_SUCCESS', () => {
    const chat: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['session chat']},
        actions.changeSessionChatNotificationSuccess(chat),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, chat}});
  });

  it('should handle CHANGE_SESSION_CHAT_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['session chat']},
        actions.changeSessionChatNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['session chat']});
  });
});