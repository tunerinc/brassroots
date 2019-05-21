'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';
import {
  type Action,
  type State,
} from '../../../reducers/player';

describe('next track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle NEXT_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.nextTrackRequest()))
      .toStrictEqual({...initialState, skippingNext: true});
  });

  it('should handle NEXT_TRACK_SUCCESS', () => {
    const currentQueueID: string = 'bar';
    const currentTrackID: string = 'bar';
    const durationMS: number = 2000;
    const nextQueueID: string = 'foo';
    const nextTrackID: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          currentQueueID: 'foo',
          currentTrackID: 'foo',
          durationMS: 1000,
          nextQueueID: 'bar',
          nextTrackID: 'bar',
        },
        actions.nextTrackSuccess(currentQueueID, currentTrackID, durationMS),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          prevQueueID: 'foo',
          prevTrackID: 'foo',
          nextQueueID: null,
          nextTrackID: null,
          paused: false,
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          currentQueueID: 'foo',
          currentTrackID: 'foo',
          durationMS: 1000,
          nextQueueID: 'bar',
          nextTrackID: 'bar',
        },
        actions.nextTrackSuccess(currentQueueID, currentTrackID, durationMS, nextQueueID, nextTrackID),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          nextQueueID,
          nextTrackID,
          prevQueueID: 'foo',
          prevTrackID: 'foo',
          paused: false,
        },
      );
  });

  it('should handle NEXT_TRACK_FAILURE', () => {
    const error: Error = new Error('foo');

    expect(
      reducer(
        {...initialState, skippingNext: true},
        actions.nextTrackFailure(error),
      )
    )
      .toStrictEqual({...initialState, error, skippingNext: false});
  });
});