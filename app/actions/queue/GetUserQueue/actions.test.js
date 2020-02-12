'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {
  type Action,
  type QueueTrack,
} from '../../../reducers/queue';

describe('get user queue synchronous action creators', () => {
  it('creates get user queue request action', () => {
    const expectedAction: Action = {type: types.GET_USER_QUEUE_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates get user queue success action', () => {
    const track: QueueTrack = {id: 'foo', seconds: 0, nanoseconds: 0};
    const queue: Array<QueueTrack> = [track];
    const unsubscribe: () => void = () => {return};
    const expectedAction: Action = {
      type: types.GET_USER_QUEUE_SUCCESS,
      queue,
      unsubscribe,
    };

    expect(actions.success(queue, unsubscribe)).toStrictEqual(expectedAction);
  });

  it('creates get user queue failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_USER_QUEUE_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});