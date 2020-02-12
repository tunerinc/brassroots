'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('previous track synchronous action creators', () => {
  it('creates previous track request action', () => {
    const expectedAction: Action = {type: types.PREVIOUS_TRACK_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates previous track success action', () => {
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;
    const prevQueueID: string = 'foo';
    const prevTrackID: string = 'foo';
    const expectedAction: Action = {
      type: types.PREVIOUS_TRACK_SUCCESS,
      currentQueueID,
      currentTrackID,
      durationMS,
      prevQueueID: null,
      prevTrackID: null,
    };

    expect(actions.success(currentQueueID, currentTrackID, durationMS))
      .toStrictEqual(expectedAction);

    const expectedActionWithPrev: Action = {
      type: types.PREVIOUS_TRACK_SUCCESS,
      currentQueueID,
      currentTrackID,
      durationMS,
      prevQueueID,
      prevTrackID,
    };

    expect(
      actions.success(
        currentQueueID,
        currentTrackID,
        durationMS,
        prevQueueID,
        prevTrackID,
      ),
    )
      .toStrictEqual(expectedActionWithPrev);
  });

  it('creates previous track failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.PREVIOUS_TRACK_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});