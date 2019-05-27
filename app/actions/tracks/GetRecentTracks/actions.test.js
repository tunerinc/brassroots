'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('get recent tracks synchronous action creators', () => {
  it('creates get recent tracks request action', () => {
    const expectedAction: Action = {
      type: types.GET_RECENT_TRACKS_REQUEST,
    };

    expect(actions.getRecentTracksRequest()).toStrictEqual(expectedAction);
  });

  it('creates get recent tracks success action', () => {
    const expectedAction: Action = {
      type: types.GET_RECENT_TRACKS_SUCCESS,
    };

    expect(actions.getRecentTracksSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get recent tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_RECENT_TRACKS_FAILURE,
      error,
    };

    expect(actions.getRecentTracksFailure(error)).toStrictEqual(expectedAction);
  });
});