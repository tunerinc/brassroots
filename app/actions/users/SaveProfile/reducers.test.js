'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/users';
import * as actions from './actions';

describe('save profile reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles SAVE_PROFILE_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, saving: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles SAVE_PROFILE_SUCCESS', () => {
    const state: State = {...initialState, saving: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles SAVE_PROFILE_FAILURE', () => {
    const state: State = {...initialState, saving: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});