'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/onboarding';

describe('create profile synchronous action creators', () => {
  it('creates create profile request action', () => {
    const expectedAction: Action = {type: types.CREATE_PROFILE_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates create profile success action', () => {
    const expectedAction: Action = {type: types.CREATE_PROFILE_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates create profile failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CREATE_PROFILE_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});