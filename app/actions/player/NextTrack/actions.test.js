'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../NextTrack/actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('next track synchronous action creators', () => {
  it('creates next track request action', () => {
    const expectedAction: Action = {
      type: types.NEXT_TRACK_REQUEST,
    };

    expect(actions.nextTrackRequest()).toStrictEqual(expectedAction);
  });

  it('creates next track success action', () => {
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;
    const nextQueueID: string = 'foo';
    const nextTrackID: string = 'foo';
    const expectedAction: Action = {
      type: types.NEXT_TRACK_SUCCESS,
      currentQueueID,
      currentTrackID,
      durationMS,
      nextQueueID: null,
      nextTrackID: null,
    };

    expect(actions.nextTrackSuccess(currentQueueID, currentTrackID, durationMS))
      .toStrictEqual(expectedAction);

    const expectedActionWithNext: Action = {
      type: types.NEXT_TRACK_SUCCESS,
      currentQueueID,
      currentTrackID,
      durationMS,
      nextQueueID,
      nextTrackID,
    };

    expect(
      actions.nextTrackSuccess(currentQueueID, currentTrackID, durationMS, nextQueueID, nextTrackID),
    )
      .toStrictEqual(expectedActionWithNext);
  });

  it('creates next track failure action', () => {
    const error: Error = new Error('foo');
    const expectedAction: Action = {
      type: types.NEXT_TRACK_FAILURE,
      error,
    };

    expect(actions.nextTrackFailure(error)).toStrictEqual(expectedAction);
  });
});