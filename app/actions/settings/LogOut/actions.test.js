'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('log out synchronous action creators', () => {
  it('creates log out request action', () => {
    const expectedAction: Action = {type: types.LOG_OUT_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates log out success action', () => {
    const expectedAction: Action = {type: types.LOG_OUT_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates log out failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.LOG_OUT_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});