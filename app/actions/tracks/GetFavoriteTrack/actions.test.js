'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('get favorite track synchronous action creators', () => {
  it('creates get favorite track request action', () => {
    const expectedAction: Action = {
      type: types.GET_FAVORITE_TRACK_REQUEST,
    };

    expect(actions.getFavoriteTrackRequest()).toStrictEqual(expectedAction);
  });

  it('creates get favorite track success action', () => {
    const expectedAction: Action = {
      type: types.GET_FAVORITE_TRACK_SUCCESS,
    };

    expect(actions.getFavoriteTrackSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get favorite track failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_FAVORITE_TRACK_FAILURE,
      error,
    };

    expect(actions.getFavoriteTrackFailure(error)).toStrictEqual(expectedAction);
  });
});