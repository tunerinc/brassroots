'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artist top listeners synchronous action creators', () => {
  it('creates get artist top listeners request action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_LISTENERS_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates get artist top listeners success action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_LISTENERS_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates get artist top listeners failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_LISTENERS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});