'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('save session reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles SAVE_SESSION_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['queue']};
    const expectedState: State = {...initialState, saving: true};
    const expectedStateTwo: State = {...expectedState, fetching: ['queue']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles SAVE_SESSION_SUCCESS', () => {
    const state: State = {...initialState, saving: true};
    const stateTwo: State = {...state, fetching: ['queue']};
    const expectedState: State = {...initialState, fetching: ['queue']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles SAVE_SESSION_FAILURE', () => {
    const state: State = {...initialState, saving: true};
    const stateTwo: State = {...state, fetching: ['queue']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['queue']};
  });
});