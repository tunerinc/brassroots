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

type User = {
  +id: string,
  +bio?: string,
  +location?: string,
  +website?: string,
};

describe('save profile reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles SAVE_PROFILE_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, savingUser: true};
    expect(reducer(initialState, actions.saveProfileRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.saveProfileRequest())).toStrictEqual(expectedState);
  });

  it('handles SAVE_PROFILE_SUCCESS', () => {
    const state: State = {...initialState, savingUser: true};
    expect(reducer(state, actions.saveProfileSuccess())).toStrictEqual(initialState);
  });

  it('handles SAVE_PROFILE_FAILURE', () => {
    const state: State = {...initialState, savingUser: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.saveProfileFailure(error))).toStrictEqual(expectedState);
  });
});