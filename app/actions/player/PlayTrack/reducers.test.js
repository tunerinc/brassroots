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

describe('play track reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles PLAY_TRACK_REQUEST', () => {
    const expectedState: State = {...initialState, attemptingToPlay: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles PLAY_TRACK_SUCCESS', () => {
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;
    const prevQueueID: string = 'bar';
    const prevTrackID: string = 'bar';
    const state: State = {...initialState, attemptingToPlay: true};
    const stateTwo: State = {...state, currentTrackID, currentQueueID};

    expect(reducer(state, actions.success(currentQueueID, currentTrackID, durationMS)))
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          paused: false,
        },
      );

    expect(reducer(stateTwo, actions.success(currentQueueID, currentTrackID, durationMS)))
      .toStrictEqual(
        {
          ...initialState,
          currentQueueID,
          currentTrackID,
          durationMS,
          paused: false,
        },
      );

    expect(reducer(stateTwo, actions.success(prevQueueID, prevTrackID, durationMS)))
      .toStrictEqual(
        {
          ...initialState,
          durationMS,
          currentQueueID: prevQueueID,
          currentTrackID: prevTrackID,
          prevQueueID: currentQueueID,
          prevTrackID: currentTrackID,
          paused: false,
        },
      );
  });

  it('handles PLAY_TRACK_FAILURE', () => {
    const state: State = {...initialState, attemptingToPlay: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, attemptingToPlay: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});