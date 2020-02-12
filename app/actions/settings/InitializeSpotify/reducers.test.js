'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/settings';
import * as actions from './actions';

describe('initialize spotify reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles INITIALIZE_SPOTIFY_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, initializing: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles INITIALIZE_SPOTIFY_SUCCESS', () => {
    const state: State = {...initialState, initializing: true};
    const loggedIn: boolean = true;
    const expectedState: State = {...initialState, loggedIn};
    expect(reducer(state, actions.success(loggedIn))).toStrictEqual(expectedState);
  });

  it('handles INITIALIZE_SPOTIFY_FAILURE', () => {
    const state: State = {...initialState, initializing: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});