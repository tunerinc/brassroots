'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

describe('paginate trending sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PAGINATE_TRENDING_SESSIONS_REQUEST', () => {
    expect(reducer(initialState, actions.paginateTrendingSessionsRequest()))
      .toStrictEqual({...initialState, paginatingSessions: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.paginateTrendingSessionsRequest(),
      ),
    )
      .toStrictEqual({...initialState, paginatingSessions: true});
  });

  it('should handle PAGINATE_TRENDING_SESSIONS_SUCCESS', () => {
    const sessions: Array<string> = ['bar', 'xyz'];
    const trendingCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, paginatingSessions: true, explore: {trendingSessions: ['foo']}},
        actions.paginateTrendingSessionsSuccess(sessions, trendingCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            trendingCanPaginate,
            trendingSessions: ['foo', ...sessions],
            trendingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle PAGINATE_TRENDING_SESSIONS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, paginatingSessions: true},
        actions.paginateTrendingSessionsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});