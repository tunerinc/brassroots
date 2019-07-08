'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/onboarding';
import * as actions from './actions';

describe('create profile reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CREATE_PROFILE_REQUEST', () => {
    expect(reducer(initialState, actions.createProfileRequest()))
      .toStrictEqual({...initialState, creatingUser: true});
  });

  it('should handle CREATE_PROFILE_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, creatingUser: true},
        actions.createProfileSuccess(),
      ),
    )
    .toStrictEqual({...initialState, profileCreated: true});
  });

  it('should handle CREATE_PROFILE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, creatingUser: true},
        actions.createProfileFailure(error),
      ),
    )
    .toStrictEqual({...initialState, error});
  });
});