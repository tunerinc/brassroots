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

    expect(actions.getAlbumsRequest(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get albums success action', () => {
    const albums: Array<string> = ['foo', 'bar'];
    const replace: boolean = true;
    const expectedAction: Action = {
      type: types.GET_ALBUMS_SUCCESS,
      albums,
      replace,
    };

    expect(actions.getAlbumsSuccess(albums)).toStrictEqual({...expectedAction, replace: false});
    expect(actions.getAlbumsSuccess(albums, replace)).toStrictEqual(expectedAction);
  });

  it('creates get albums failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ALBUMS_FAILURE,
      error,
    };

    expect(actions.getAlbumsFailure(error)).toStrictEqual(expectedAction);
  });
});