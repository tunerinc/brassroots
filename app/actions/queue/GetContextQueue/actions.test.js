'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('get context queue synchronous action creators', () => {
  it('creates get context queue request action', () => {
    const expectedAction: Action = {type: types.GET_CONTEXT_QUEUE_REQUEST};
    expect(actions.getContextQueueRequest()).toStrictEqual(expectedAction);
  });

  it('creates get context queue success action', () => {
    const contextQueue: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.GET_CONTEXT_QUEUE_SUCCESS,
      contextQueue: [],
    };

    expect(actions.getContextQueueSuccess()).toStrictEqual(expectedAction);

    const expectedActionWithQueue: Action = {
      type: types.GET_CONTEXT_QUEUE_SUCCESS,
      contextQueue,
    };

    expect(actions.getContextQueueSuccess(contextQueue)).toStrictEqual(expectedActionWithQueue);
  });

  it('creates get context queue failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_CONTEXT_QUEUE_FAILURE,
      error,
    };

    expect(actions.getContextQueueFailure(error)).toStrictEqual(expectedAction);
  });
});