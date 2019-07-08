'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('paginate trending sessions synchronous action creators', () => {
  it('creates paginate trending sessions request action', () => {
    const expectedAction: Action = {
      type: types.PAGINATE_TRENDING_SESSIONS_REQUEST,
    };

    expect(actions.paginateTrendingSessionsRequest()).toStrictEqual(expectedAction);
  });

  it('creates paginate trending sessions success action', () => {
    const sessions: Array<string> = ['foo', 'bar'];
    const trendingCanPaginate: boolean = true;
    const expectedAction: Action = {
      type: types.PAGINATE_TRENDING_SESSIONS_SUCCESS,
      sessions,
      trendingCanPaginate,
    };

    expect(actions.paginateTrendingSessionsSuccess(sessions, trendingCanPaginate))
      .toStrictEqual(expectedAction);
  });

  it('creates paginate trending sessions failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.PAGINATE_TRENDING_SESSIONS_FAILURE,
      error,
    };

    expect(actions.paginateTrendingSessionsFailure(error)).toStrictEqual(expectedAction);
  });
});