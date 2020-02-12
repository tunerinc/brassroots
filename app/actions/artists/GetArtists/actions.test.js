'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artists synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.GET_ARTISTS_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const artists: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.GET_ARTISTS_SUCCESS,
      artists,
    };

    expect(actions.success(artists)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTISTS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});