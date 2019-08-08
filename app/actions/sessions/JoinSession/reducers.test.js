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

describe('join session reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles JOIN_SESSION_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, joiningSession: true};
    expect(reducer(initialState, actions.joinSessionRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.joinSessionRequest())).toStrictEqual(expectedState);
  });

  it('handles JOIN_SESSION_SUCCESS', () => {
    const currentSessionID: string = 'foo';
    const state: State = {...initialState, joiningSession: true};
    const expectedState: State = {...initialState, currentSessionID};
    expect(reducer(state, actions.joinSessionSuccess(currentSessionID))).toStrictEqual(expectedState);
  });

  it('handles JOIN_SESSION_FAILURE', () => {
    const error: Error = new Error('error');
    const state: State = {...initialState, joiningSession: true};
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.joinSessionFailure(error))).toStrictEqual(expectedState);
  });
});