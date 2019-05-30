'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('get session queue synchronous action creators', () => {
  it('creates get session queue request action', () => {
    const expectedAction: Action = {
      type: types.GET_SESSION_QUEUE_REQUEST,
    };

    expect(actions.getSessionQueueRequest()).toStrictEqual(expectedAction);
  });

  it('creates get session queue success action', () => {
    const queue: Array<string> = ['foo', 'bar'];
    const unsubscribe: () => void = () => {return};
    const expectedAction: Action = {
      type: types.GET_SESSION_QUEUE_SUCCESS,
      queue,
      unsubscribe,
    };

    expect(actions.getSessionQueueSuccess(queue, unsubscribe)).toStrictEqual(expectedAction);
  });

  it('creates get session queue failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_SESSION_QUEUE_FAILURE,
      error,
    };

    expect(actions.getSessionQueueFailure(error)).toStrictEqual(expectedAction);
  });
});