'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
  type Session,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('leave session reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles LEAVE_SESSION_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, leavingSession: true};
    expect(reducer(initialState, actions.leaveSessionRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.leaveSessionRequest())).toStrictEqual(expectedState);
  });

  it('handles LEAVE_SESSION_SUCCESS', () => {
    const sessionID: string = 'foo';
    const isOwner: boolean = true;
    const state: State = {...initialState, leavingSession: true};
    expect(reducer(state, actions.leaveSessionSuccess(sessionID, isOwner)))
      .toStrictEqual(initialState);
  });

  it('handles LEAVE_SESSION_FAILURE', () => {
    const state: State = {...initialState, leavingSession: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.leaveSessionFailure(error))).toStrictEqual(expectedState);
  });
});