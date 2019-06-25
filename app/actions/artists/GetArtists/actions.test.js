'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artists synchronous action creators', () => {
  it('creates get artists request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_ARTISTS_REQUEST,
      refreshing,
    };

    expect(actions.getArtistsRequest(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get artists success action', () => {
    const artists: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.GET_ARTISTS_SUCCESS,
      artists,
    };

    expect(actions.getArtistsSuccess(artists)).toStrictEqual(expectedAction);
  });

  it('creates get artists failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTISTS_FAILURE,
      error,
    };

    expect(actions.getArtistsFailure(error)).toStrictEqual(expectedAction);
  });
});