'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('queue track synchronous action creators', () => {
  it('creates queue track request action', () => {
    const expectedAction: Action = {type: types.QUEUE_TRACK_REQUEST};
    expect(actions.queueTrackRequest()).toStrictEqual(expectedAction);
  });

  it('creates queue track success action', () => {
    const expectedAction: Action = {type: types.QUEUE_TRACK_SUCCESS};
    expect(actions.queueTrackSuccess()).toStrictEqual(expectedAction);
  });

  it('creates queue track failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.QUEUE_TRACK_FAILURE,
      error,
    };

    expect(actions.queueTrackFailure(error)).toStrictEqual(expectedAction);
  });
});