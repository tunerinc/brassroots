'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('stop player reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle STOP_PLAYER_REQUEST', () => {
    expect(
      reducer(
        {...initialState, paused: false},
        actions.stopPlayerRequest(),
      ),
    )
      .toStrictEqual({...initialState, paused: false, pausing: true});
  });

  it('should handle STOP_PLAYER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, paused: false, pausing: true},
        actions.stopPlayerSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle STOP_PLAYER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, paused: false, pausing: true},
        actions.stopPlayerFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, paused: false});
  });
});