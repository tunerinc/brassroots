'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('get tracks synchronous action creators', () => {
  it('creates get tracks request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_TRACKS_REQUEST,
      refreshing,
    };

    expect(actions.getTracksRequest(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get tracks success action', () => {
    const tracks: Array<string> = ['bar', 'xyz'];
    const expectedAction: Action = {
      type: types.GET_TRACKS_SUCCESS,
      tracks,
    };

    expect(actions.getTracksSuccess(tracks)).toStrictEqual(expectedAction);
  });

  it('creates get tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_TRACKS_FAILURE,
      error,
    };

    expect(actions.getTracksFailure(error)).toStrictEqual(expectedAction);
  });
});