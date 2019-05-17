'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('previous track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PREVIOUS_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.previousTrackRequest()))
      .toStrictEqual({...initialState, skippingPrev: true});
  });

  it('should handle PREVIOUS_TRACK_SUCCESS', () => {
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;
    const prevQueueID: string = 'bar';
    const prevTrackID: string = 'bar';

    expect(
      reducer(
        {
          ...initialState,
          currentQueueID: 'bar',
          currentTrackID: 'bar',
          durationMS: 1000,
        },
        actions.previousTrackSuccess(currentQueueID, currentTrackID, durationMS),
      ),
    )
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
        {
          ...initialState,
          currentQueueID: 'bar',
          currentTrackID: 'bar',
          durationMS: 1000,
        },
        actions.previousTrackSuccess(
          currentQueueID,
          currentTrackID,
          durationMS,
          prevQueueID,
          prevTrackID,
        ),
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

  it('should handle PREVIOUS_TRACK_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, skippingPrev: true},
        actions.previousTrackFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, skippingPrev: false});
  });
});