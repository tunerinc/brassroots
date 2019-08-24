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

describe('pause player reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles PAUSE_PLAYER_REQUEST', () => {
    const state: State = {...initialState, paused: false};
    const expectedState: State = {...initialState, pausing: true, paused: false};
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles PAUSE_PLAYER_SUCCESS', () => {
    const state: State = {...initialState, pausing: true, paused: false};
    const expectedState: State = {...initialState, pausing: false, paused: true};
    expect(reducer(state, actions.success())).toStrictEqual(expectedState);
  });

  it('handles PAUSE_PLAYER_FAILURE', () => {
    const state: State = {...initialState, pausing: true, paused: false};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, pausing: false, paused: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});