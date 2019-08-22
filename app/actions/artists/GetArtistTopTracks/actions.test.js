'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artist top tracks synchronous action creators', () => {
  it('creates get artist top tracks request action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_TRACKS_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates get artist top tracks success action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_TRACKS_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates get artist top tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_TRACKS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});