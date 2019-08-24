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

describe('auth user reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles AUTHORIZE_USER_REQUEST', () => {
    const expectedState: State = {...initialState, loggingIn: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles AUTHORIZE_USER_SUCCESS', () => {
    const state: State = {...initialState, loggingIn: true};
    const expectedState: State = {...initialState, loggedIn: true};
    expect(reducer(state, actions.success())).toStrictEqual(expectedState);
  });

  it('handles AUTHORIZE_USER_FAILURE', () => {
    const state: State = {...initialState, loggingIn: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});