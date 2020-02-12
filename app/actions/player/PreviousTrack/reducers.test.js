'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/player';
import * as actions from './actions';

describe('previous track reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles PREVIOUS_TRACK_REQUEST', () => {
    const expectedState: State = {...initialState, skippingPrev: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles PREVIOUS_TRACK_SUCCESS', () => {
    const state: State = {...initialState, currentQueueID: 'bar', currentTrackID: 'bar', durationMS: 1000};
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;
    const prevQueueID: string = 'bar';
    const prevTrackID: string = 'bar';

    expect(reducer(state, actions.success(currentQueueID, currentTrackID, durationMS)))
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          prevQueueID: null,
          prevTrackID: null,
          paused: false,
        }
      );

    expect(
      reducer(
        state,
        actions.success(currentQueueID, currentTrackID, durationMS, prevQueueID, prevTrackID),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          prevQueueID,
          prevTrackID,
          paused: false,
        }
      );
  });

  it('handles PREVIOUS_TRACK_FAILURE', () => {
    const state: State = {...initialState, skippingPrev: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, skippingPrev: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});