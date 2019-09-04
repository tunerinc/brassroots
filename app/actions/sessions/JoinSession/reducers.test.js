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
    const expectedState: State = {...initialState, joining: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles JOIN_SESSION_SUCCESS', () => {
    const state: State = {...initialState, joining: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles JOIN_SESSION_FAILURE', () => {
    const error: Error = new Error('error');
    const state: State = {...initialState, joining: true};
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});