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

describe('stop player reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles STOP_PLAYER_REQUEST', () => {
    const state: State = {...initialState, paused: false};
    const expectedState: State = {...initialState, paused: false, pausing: true};
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles STOP_PLAYER_SUCCESS', () => {
    const state: State = {...initialState, paused: false, pausing: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles STOP_PLAYER_FAILURE', () => {
    const state: State = {...initialState, paused: false, pausing: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, paused: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState)
  });
});