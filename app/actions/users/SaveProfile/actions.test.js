'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

type User = {
  +id: string,
  +bio?: string,
  +location?: string,
  +website?: string,
  +onboarding: boolean,
};

describe('save profile synchronous action creators', () => {
  it('creates save profile request action', () => {
    const expectedAction: Action = {
      type: types.SAVE_PROFILE_REQUEST,
    };

    expect(actions.saveProfileRequest()).toStrictEqual(expectedAction);
  });

  it('creates save profile success action', () => {
    const user: User = {
      id: 'foo',
      bio: 'foo',
      birthdate: 'foo',
      location: 'foo',
      website: 'foo',
      onboarding: true,
    };

    const expectedAction: Action = {
      type: types.SAVE_PROFILE_SUCCESS,
      user,
    };

    expect(actions.saveProfileSuccess(user)).toStrictEqual(expectedAction);
  });

  it('creates save profile failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.SAVE_PROFILE_FAILURE,
      error,
    };

    expect(actions.saveProfileFailure(error)).toStrictEqual(expectedAction);
  });
});