'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/onboarding';
import * as actions from './actions';

describe('create profile reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CREATE_PROFILE_REQUEST', () => {
    const expectedState: State = {...initialState, creating: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CREATE_PROFILE_SUCCESS', () => {
    const state: State = {...initialState, creating: true};
    const expectedState: State = {...initialState, created: true};
    expect(reducer(state, actions.success())).toStrictEqual(expectedState);
  });

  it('handles CREATE_PROFILE_FAILURE', () => {
    const state: State = {...initialState, creating: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});