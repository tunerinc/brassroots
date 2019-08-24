'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('authorize user synchronous action creators', () => {
  it('creates auth user request action', () => {
    const expectedAction: Action = {type: types.AUTHORIZE_USER_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates auth user success action', () => {
    const expectedAction: Action = {type: types.AUTHORIZE_USER_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates auth user failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.AUTHORIZE_USER_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});