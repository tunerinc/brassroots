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

describe('toggle mute reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles TOGGLE_MUTE_REQUEST', () => {
    const expectedState: State = {...initialState, muting: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles TOGGLE_MUTE_SUCCESS', () => {
    const state: State = {...initialState, muting: true};
    const stateTwo: State = {...state, muted: true};
    const expectedState: State = {...initialState, muting: false, muted: true};
    const expectedStateTwo: State = {...expectedState, muted: false};
    expect(reducer(state, actions.success(true))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.success(false))).toStrictEqual(expectedStateTwo);
  });

  it('handles TOGGLE_MUTE_FAILURE', () => {
    const state: State = {...initialState, muting: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, muting: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});