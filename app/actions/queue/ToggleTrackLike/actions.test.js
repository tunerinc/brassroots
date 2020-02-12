'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('toggle track like synchronous action creators', () => {
  it('creates request action', () => {
    const queueID: string = 'foo';
    const expectedAction: Action = {
      type: types.TOGGLE_TRACK_LIKE_REQUEST,
      queueID,
    };

    expect(actions.request(queueID)).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const queueID: string = 'foo';
    const expectedAction: Action = {
      type: types.TOGGLE_TRACK_LIKE_SUCCESS,
      queueID,
    };

    expect(actions.success(queueID)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const queueID: string = 'foo';
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.TOGGLE_TRACK_LIKE_FAILURE,
      queueID,
      error,
    };

    expect(actions.failure(queueID, error)).toStrictEqual(expectedAction);
  });
});