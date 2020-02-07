'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('delete queue track synchronous action creators', () => {
  it('creates request action', () => {
    const queueID: string = 'foo';
    const expectedAction: Action = {
      type: types.DELETE_QUEUE_TRACK_REQUEST,
      queueID,
    };

    expect(actions.request(queueID)).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const queueID: string = 'foo';
    const expectedAction: Action = {
      type: types.DELETE_QUEUE_TRACK_SUCCESS,
      queueID,
    };

    expect(actions.success(queueID)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const queueID: string = 'foo';
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.DELETE_QUEUE_TRACK_FAILURE,
      queueID,
      error,
    };

    expect(actions.failure(queueID, error)).toStrictEqual(expectedAction);
  });
});