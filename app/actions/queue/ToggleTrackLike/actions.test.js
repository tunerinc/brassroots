'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('toggle track like synchronous action creators', () => {
  it('creates toggle track like request action', () => {
    const queueID: string = 'foo';
    const expectedAction: Action = {
      type: types.TOGGLE_TRACK_LIKE_REQUEST,
      queueID,
    };

    expect(actions.toggleTrackLikeRequest(queueID)).toStrictEqual(expectedAction);
  });

  it('creates toggle track like success action', () => {
    const queueID: string = 'foo';
    const expectedAction: Action = {
      type: types.TOGGLE_TRACK_LIKE_SUCCESS,
      queueID,
    };

    expect(actions.toggleTrackLikeSuccess(queueID)).toStrictEqual(expectedAction);
  });

  it('creates toggle track like failure action', () => {
    const queueID: string = 'foo';
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.TOGGLE_TRACK_LIKE_FAILURE,
      queueID,
      error,
    };

    expect(actions.toggleTrackLikeFailure(queueID, error)).toStrictEqual(expectedAction);
  });
});