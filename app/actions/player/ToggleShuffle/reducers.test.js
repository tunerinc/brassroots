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

describe('toggle shuffle reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles TOGGLE_SHUFFLE_REQUEST', () => {
    const expectedState: State = {...initialState, shuffling: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles TOGGLE_SHUFFLE_SUCCESS', () => {
    const shuffle: boolean = true;
    const state: State = {...initialState, shuffling: true};
    const stateTwo: State = {...initialState, shuffle, shuffling: true};
    const expectedState: State = {...initialState, shuffle};
    expect(reducer(state, actions.success(shuffle))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.success(!shuffle))).toStrictEqual(initialState);
  });

  it('handles TOGGLE_SHUFFLE_FAILURE', () => {
    const state: State = {...initialState, shuffling: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});