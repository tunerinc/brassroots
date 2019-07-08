'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('pause player reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PAUSE_PLAYER_REQUEST', () => {
    expect(
      reducer(
        {...initialState, paused: false},
        actions.pausePlayerRequest(),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          pausing: true,
          paused: false,
        },
      );
  });

  it('should handle PAUSE_PLAYER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, pausing: true, paused: false},
        actions.pausePlayerSuccess(),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          pausing: false,
          paused: true,
        },
      );
  });

  it('should handle PAUSE_PLAYER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, pausing: true, paused: false},
        actions.pausePlayerFailure(error),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          error,
          pausing: false,
          paused: false,
        },
      );
  });
});