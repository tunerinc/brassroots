'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/feedback';
import * as actions from './actions';

describe('report problem reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('returns REPORT_PROBLEM_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, sending: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('returns REPORT_PROBLEM_SUCCESS', () => {
    const state: State = {...initialState, sending: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('returns REPORT_PROBLEM_FAILURE', () => {
    const state: State = {...initialState, sending: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});