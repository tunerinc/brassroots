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

describe('toggle pause reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles TOGGLE_PAUSE_REQUEST', () => {
    const expectedState: State = {...initialState, pausing: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles TOGGLE_PAUSE_SUCCESS', () => {
    const state: State = {...initialState, pausing: true};
    const stateTwo: State = {...initialState, paused: false, pausing: true}
    const expectedState: State = {...initialState, paused: false, pausing: false, progress: 1000};
    const expectedStateTwo: State = {...expectedState, paused: true};
    expect(reducer(state, actions.success(false, 1000))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.success(true, 1000))).toStrictEqual(expectedStateTwo);
  });

  it('handles TOGGLE_PAUSE_FAILURE', () => {
    const state: State = {...initialState, pausing: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});