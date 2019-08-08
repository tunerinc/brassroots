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

describe('create session reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CREATE_SESSION_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, joiningSession: true};
    expect(reducer(initialState, actions.createSessionRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.createSessionRequest())).toStrictEqual(expectedState);
  });

  it('handles CREATE_SESSION_SUCCESS', () => {
    const currentSessionID: string = 'foo';
    const state: State = {...initialState, joiningSession: true};
    const expectedState: State = {...initialState, currentSessionID};
    expect(reducer(state, actions.createSessionSuccess(currentSessionID)))
      .toStrictEqual(expectedState);
  });

  it('handles CREATE_SESSION_FAILURE', () => {
    const state: State = {...initialState, joiningSession: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.createSessionFailure(error))).toStrictEqual(expectedState);
  });
});