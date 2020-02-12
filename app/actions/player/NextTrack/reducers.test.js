'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Action,
  type State,
} from '../../../reducers/player';
import * as actions from './actions';

describe('next track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle NEXT_TRACK_REQUEST', () => {
    const expectedState: State = {...initialState, skippingNext: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('should handle NEXT_TRACK_SUCCESS', () => {
    const currentQueueID: string = 'bar';
    const currentTrackID: string = 'bar';
    const durationMS: number = 2000;
    const nextQueueID: string = 'foo';
    const nextTrackID: string = 'foo';
    const state: State = {
      ...initialState,
      currentQueueID: 'foo',
      currentTrackID: 'foo',
      durationMS: 1000,
      nextQueueID: 'bar',
      nextTrackID: 'bar',
    };

    const expectedState: State = {
      ...initialState,
      currentQueueID,
      currentTrackID,
      durationMS,
      prevQueueID: 'foo',
      prevTrackID: 'foo',
      nextQueueID: null,
      nextTrackID: null,
      paused: false,
    };

    const expectedStateTwo: State = {...expectedState, nextQueueID, nextTrackID};

    expect(reducer(state, actions.success(currentQueueID, currentTrackID, durationMS)))
      .toStrictEqual(expectedState);

    expect(
      reducer(
        state,
        actions.success(currentQueueID, currentTrackID, durationMS, nextQueueID, nextTrackID),
      )
    )
      .toStrictEqual(expectedStateTwo);
  });

  it('should handle NEXT_TRACK_FAILURE', () => {
    const state: State = {...initialState, skippingNext: true};
    const error: Error = new Error('foo');
    const expectedState: State = {...initialState, error, skippingNext: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});