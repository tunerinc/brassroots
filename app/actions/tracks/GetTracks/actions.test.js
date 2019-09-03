'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('get tracks synchronous action creators', () => {
  it('creates request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_TRACKS_REQUEST,
      refreshing,
    };

    expect(actions.request(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const tracks: Array<string> = ['bar', 'xyz'];
    const total: number = 2;
    const replace: boolean = true;
    const expectedAction: Action = {
      type: types.GET_TRACKS_SUCCESS,
      tracks,
      total,
      replace,
    };

    expect(actions.success(tracks, total)).toStrictEqual({...expectedAction, replace: false});
    expect(actions.success(tracks, total, replace)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_TRACKS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});