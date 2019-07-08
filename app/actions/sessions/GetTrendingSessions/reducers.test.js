'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

describe('get trending sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_TRENDING_SESSIONS_REQUEST', () => {
    expect(reducer(initialState, actions.getTrendingSessionsRequest()))
      .toStrictEqual({...initialState, fetchingSessions: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getTrendingSessionsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingSessions: true});

    expect(
      reducer(
        {...initialState, explore: {trendingSessions: ['foo']}},
        actions.getTrendingSessionsRequest(),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          refreshingSessions: true,
          fetchingSessions: true,
          explore: {trendingSessions: ['foo']},
        },
      );
  });

  it('should handle GET_TRENDING_SESSIONS_SUCCESS', () => {
    const trendingSessions: Array<string> = ['foo', 'bar'];
    const trendingCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, fetchingSessions: true},
        actions.getTrendingSessionsSuccess(trendingSessions, trendingCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            ...initialState.explore,
            trendingSessions,
            trendingCanPaginate,
            trendingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle GET_TRENDING_SESSIONS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, refreshingSessions: true, fetchingSessions: true},
        actions.getTrendingSessionsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});