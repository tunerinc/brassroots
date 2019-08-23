'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/chat';

describe('get chat synchronous action creators', () => {
  it('creates get chat request action', () => {
    const expectedAction: Action = {type: types.GET_CHAT_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates get chat success action', () => {
    const messages: Array<string> = ['foo', 'bar'];
    const unsubscribe: () => void = () => {return};
    const expectedAction: Action = {
      type: types.GET_CHAT_SUCCESS,
      messages,
      unsubscribe,
    };

    expect(actions.success(messages, unsubscribe)).toStrictEqual(expectedAction);
  });

  it('creates get chat failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_CHAT_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});