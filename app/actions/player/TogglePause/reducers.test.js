'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('toggle pause reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle TOGGLE_PAUSE_REQUEST', () => {
    expect(reducer(initialState, actions.togglePauseRequest()))
      .toStrictEqual({...initialState, pausing: true});
  });

  it('should handle TOGGLE_PAUSE_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, pausing: true},
        actions.togglePauseSuccess(false, 1000),
      ),
    )
      .toStrictEqual({...initialState, paused: false, pausing: false, progress: 1000});

    expect(
      reducer(
        {...initialState, paused: false, pausing: true},
        actions.togglePauseSuccess(true, 1000),
      ),
    )
      .toStrictEqual({...initialState, paused: true, pausing: false, progress: 1000});
  });

  it('should handle TOGGLE_PAUSE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, pausing: true},
        actions.togglePauseFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, pausing: false});
  });
});