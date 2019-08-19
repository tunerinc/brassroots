'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/onboarding';
import userReducer, {
  initialState as userState,
  type State as UserState,
} from '../../../reducers/users';
import * as actions from './actions';

describe('create profile reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CREATE_PROFILE_REQUEST', () => {
    const expectedState: State = {...initialState, creatingUser: true};
    expect(reducer(initialState, actions.createProfileRequest())).toStrictEqual(expectedState);
  });

  it('handles CREATE_PROFILE_SUCCESS', () => {
    const state: State = {...initialState, creatingUser: true};
    const currentUserID: string = 'foo';
    const expectedState: State = {...initialState, profileCreated: true};
    expect(reducer(state, actions.createProfileSuccess())).toStrictEqual(expectedState);
  });

  it('handles CREATE_PROFILE_FAILURE', () => {
    const state: State = {...initialState, creatingUser: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.createProfileFailure(error))).toStrictEqual(expectedState);
  });
});