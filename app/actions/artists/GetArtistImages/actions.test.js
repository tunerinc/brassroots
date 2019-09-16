'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {
  type Action,
  type Artist,
} from '../../../reducers/artists';

describe('get artist images synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_IMAGES_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_IMAGES_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_IMAGES_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});