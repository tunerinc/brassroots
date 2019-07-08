'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('stop queue listener synchronous action creators', () => {
  it('creates stop queue listener request action', () => {
    const expectedAction: Action = {
      type: types.STOP_QUEUE_LISTENER_REQUEST,
    };

    expect(actions.stopQueueListenerRequest()).toStrictEqual(expectedAction);
  });

  it('creates stop queue listener success action', () => {
    const expectedAction: Action = {
      type: types.STOP_QUEUE_LISTENER_SUCCESS,
    };

    expect(actions.stopQueueListenerSuccess()).toStrictEqual(expectedAction);
  });

  it('creates stop queue listener failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.STOP_QUEUE_LISTENER_FAILURE,
      error,
    };

    expect(actions.stopQueueListenerFailure(error)).toStrictEqual(expectedAction);
  });
});