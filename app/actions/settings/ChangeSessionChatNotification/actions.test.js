'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change session chat notification synchronous action creators', () => {
  it('creates change session chat notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_CHAT_NOTIFICATION_REQUEST,
    };

    expect(actions.changeSessionChatNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change session chat notification success action', () => {
    const status: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_CHAT_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changeSessionChatNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change session chat notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_CHAT_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changeSessionChatNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});