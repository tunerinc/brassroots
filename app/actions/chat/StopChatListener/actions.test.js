'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/chat';

describe('stop chat listener synchronous action creators', () => {
  it('creates stop chat listener request action', () => {
    const expectedAction: Action = {type: types.STOP_CHAT_LISTENER_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates stop chat listener success action', () => {
    const expectedAction: Action = {type: types.STOP_CHAT_LISTENER_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates stop chat listener failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.STOP_CHAT_LISTENER_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});