'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('play track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PLAY_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.playTrackRequest()))
      .toStrictEqual({...initialState, attemptingToPlay: true});
  });

  it('should handle PLAY_TRACK_SUCCESS', () => {
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;

    expect(
      reducer(
        {...initialState, attemptingToPlay: true},
        actions.playTrackSuccess(currentQueueID, currentTrackID, durationMS),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          attemptingToPlay: false,
          paused: false,
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          attemptingToPlay: true,
        },
        actions.playTrackSuccess(currentQueueID, currentTrackID, durationMS),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          prevQueueID: currentQueueID,
          prevTrackID: currentTrackID,
          attemptingToPlay: false,
          paused: false,
        }
      );
  });

  it('should handle PLAY_TRACK_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, attemptingToPlay: true},
        actions.playTrackFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, attemptingToPlay: false});
  });
});