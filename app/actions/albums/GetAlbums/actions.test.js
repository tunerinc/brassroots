'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/albums';

describe('get albums synchronous action creators', () => {
  it('creates get albums request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_ALBUMS_REQUEST,
      refreshing,
    };

    expect(actions.request(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get albums success action', () => {
    const albums: Array<string> = ['foo', 'bar'];
    const total: number = 5;
    const replace: boolean = true;
    const expectedAction: Action = {
      type: types.GET_ALBUMS_SUCCESS,
      albums,
      total,
      replace,
    };

    expect(actions.success(albums, total)).toStrictEqual({...expectedAction, replace: false});
    expect(actions.success(albums, total, replace)).toStrictEqual(expectedAction);
  });

  it('creates get albums failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ALBUMS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});