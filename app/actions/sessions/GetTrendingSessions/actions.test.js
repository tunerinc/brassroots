'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('get trending sessions synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.GET_TRENDING_SESSIONS_REQUEST};
    expect(actions.getTrendingSessionsRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const trendingIDs: Array<string> = ['foo', 'bar'];
    const trendingCanPaginate: boolean = true;
    const expectedAction: Action = {
      type: types.GET_TRENDING_SESSIONS_SUCCESS,
      trendingIDs,
      trendingCanPaginate,
    };

    expect(actions.getTrendingSessionsSuccess(trendingIDs, trendingCanPaginate))
      .toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_TRENDING_SESSIONS_FAILURE,
      error,
    };

    expect(actions.getTrendingSessionsFailure(error)).toStrictEqual(expectedAction);
  });
});