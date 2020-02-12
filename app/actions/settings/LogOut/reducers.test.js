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

describe('log out reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles LOG_OUT_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, loggingOut: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles LOG_OUT_SUCCESS', () => {
    const state: State = {...initialState, loggingOut: true};
    const expectedState: State = {...initialState, initialized: true};
    expect(reducer(state, actions.success())).toStrictEqual(expectedState);
  });

  it('handles LOG_OUT_FAILURE', () => {
    const state: State = {...initialState, loggingOut: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});