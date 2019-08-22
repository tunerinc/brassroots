'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artist top albums synchronous action creators', () => {
  it('creates get artist top albums request action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_ALBUMS_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates get artist top albums success action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_ALBUMS_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates get artist top albums failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_ALBUMS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});