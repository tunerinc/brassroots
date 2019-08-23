'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/legal';

describe('get terms synchronous action creators', () => {
  it('creates get terms request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_TERMS_REQUEST,
      refreshing,
    };

    expect(actions.request(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get terms success action', () => {
    const text: string = 'foo';
    const expectedAction: Action = {
      type: types.GET_TERMS_SUCCESS,
      text,
    };

    expect(actions.success(text)).toStrictEqual(expectedAction);
  });

  it('creates get terms failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_TERMS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});