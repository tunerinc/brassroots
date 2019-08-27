'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('get playlists synchronous action creators', () => {
  it('creates request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_PLAYLISTS_REQUEST,
      refreshing,
    };

    expect(actions.request(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const playlists: Array<string> = ['foo', 'bar'];
    const total: number = 2;
    const expectedAction: Action = {
      type: types.GET_PLAYLISTS_SUCCESS,
      playlists,
      total,
    };

    expect(actions.success(playlists, total)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_PLAYLISTS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});