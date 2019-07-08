'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('get nearby sessions synchronous action creators', () => {
  it('creates get nearby sessions request action', () => {
    const expectedAction: Action = {
      type: types.GET_NEARBY_SESSIONS_REQUEST,
    };

    expect(actions.getNearbySessionsRequest()).toStrictEqual(expectedAction);
  });

  it('creates get nearby sessions success action', () => {
    const nearbySessions: Array<string> = ['foo', 'bar'];
    const nearbyCanPaginate: boolean = true;
    const expectedAction: Action = {
      type: types.GET_NEARBY_SESSIONS_SUCCESS,
      nearbySessions,
      nearbyCanPaginate,
    };

    expect(actions.getNearbySessionsSuccess(nearbySessions, nearbyCanPaginate))
      .toStrictEqual(expectedAction);
  });

  it('creates get nearby sessions failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_NEARBY_SESSIONS_FAILURE,
      error,
    };

    expect(actions.getNearbySessionsFailure(error)).toStrictEqual(expectedAction);
  });
});