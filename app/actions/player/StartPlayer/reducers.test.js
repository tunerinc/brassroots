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

describe('start player reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles START_PLAYER_REQUEST', () => {
    const expectedState: State = {...initialState, attemptingToPlay: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles START_PLAYER_SUCCESS', () => {
    const state: State = {...initialState, attemptingToPlay: true};
    const expectedState: State = {...initialState, paused: false};
    expect(reducer(state, actions.success())).toStrictEqual(expectedState);
  });

  it('handles START_PLAYER_FAILURE', () => {
    const state: State = {...initialState, attemptingToPlay: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});