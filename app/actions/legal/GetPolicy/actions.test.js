'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/legal';

describe('get policy synchronous action creators', () => {
  it('creates get policy request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_POLICY_REQUEST,
      refreshing,
    };

    expect(actions.request(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get policy success action', () => {
    const text: string = 'foo';
    const expectedAction: Action = {
      type: types.GET_POLICY_SUCCESS,
      text,
    };

    expect(actions.success(text)).toStrictEqual(expectedAction);
  });

  it('creates get policy failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_POLICY_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});