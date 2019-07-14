'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('get user queue synchronous action creators', () => {
  it('creates get user queue request action', () => {
    const expectedAction: Action = {
      type: types.GET_USER_QUEUE_REQUEST,
    };

    expect(actions.getUserQueueRequest()).toStrictEqual(expectedAction);
  });

  it('creates get user queue success action', () => {
    const queue: Array<string> = ['foo', 'bar'];
    const unsubscribe: () => void = () => {return};
    const expectedAction: Action = {
      type: types.GET_USER_QUEUE_SUCCESS,
      queue,
      unsubscribe,
    };

    expect(actions.getUserQueueSuccess(queue, unsubscribe)).toStrictEqual(expectedAction);
  });

  it('creates get user queue failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_USER_QUEUE_FAILURE,
      error,
    };

    expect(actions.getUserQueueFailure(error)).toStrictEqual(expectedAction);
  });
});