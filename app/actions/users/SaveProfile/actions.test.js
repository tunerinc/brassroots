'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('save profile synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.SAVE_PROFILE_REQUEST};
    expect(actions.saveProfileRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const expectedAction: Action = {type: types.SAVE_PROFILE_SUCCESS};
    expect(actions.saveProfileSuccess()).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.SAVE_PROFILE_FAILURE,
      error,
    };

    expect(actions.saveProfileFailure(error)).toStrictEqual(expectedAction);
  });
});