'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/chat';

describe('send chat message synchronous action creators', () => {
  it('creates send chat message request action', () => {
    const expectedAction: Action = {type: types.SEND_CHAT_MESSAGE_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates send chat message success action', () => {
    const expectedAction: Action = {type: types.SEND_CHAT_MESSAGE_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates send chat message failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.SEND_CHAT_MESSAGE_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});