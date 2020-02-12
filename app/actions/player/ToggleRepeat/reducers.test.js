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

describe('toggle repeat reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles TOGGLE_REPEAT_REQUEST', () => {
    const expectedState: State = {...initialState, repeating: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles TOGGLE_REPEAT_SUCCESS', () => {
    const repeat = true;
    const state: State = {...initialState, repeating: true};
    const stateTwo: State = {...state, repeat};
    const expectedState: State = {...initialState, repeat, repeating: false};
    const expectedStateTwo: State = {...expectedState, repeat: false};
    expect(reducer(state, actions.success(repeat))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.success(!repeat))).toStrictEqual(expectedStateTwo);
  });

  it('handles TOGGLE_REPEAT_FAILURE', () => {
    const state: State = {...initialState, repeating: true};
    const error = new Error('error');
    const expectedState: State = {...initialState, error, repeating: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});