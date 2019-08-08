'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('paginate trending sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PAGINATE_TRENDING_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, paginatingSessions: true};
    expect(reducer(state, actions.paginateTrendingSessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.paginateTrendingSessionsRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle PAGINATE_TRENDING_SESSIONS_SUCCESS', () => {
    const sessions: Array<string> = ['bar', 'xyz'];
    const trendingCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, paginatingSessions: true, explore: {trendingIDs: ['foo']}},
        actions.paginateTrendingSessionsSuccess(sessions, trendingCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            trendingCanPaginate,
            trendingIDs: ['foo', ...sessions],
            trendingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle PAGINATE_TRENDING_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, paginatingSessions: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.paginateTrendingSessionsFailure(error)))
      .toStrictEqual(expectedState);
  });
});