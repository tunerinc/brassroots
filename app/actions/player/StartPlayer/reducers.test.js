'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('start player reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle START_PLAYER_REQUEST', () => {
    expect(reducer(initialState, actions.startPlayerRequest()))
      .toStrictEqual({...initialState, attemptingToPlay: true});
  });

  it('should handle START_PLAYER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, attemptingToPlay: true},
        actions.startPlayerSuccess(),
      ),
    )
      .toStrictEqual({...initialState, attemptingToPlay: false, paused: false});
  });

  it('should handle START_PLAYER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, attemptingToPlay: true},
        actions.startPlayerFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, attemptingToPlay: false});
  });
});