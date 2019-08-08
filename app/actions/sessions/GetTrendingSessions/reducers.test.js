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

describe('get trending sessions reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_TRENDING_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const sessionState: State = {...initialState, explore: {trendingIDs: ['foo']}};
    const expectedState: State = {...initialState, fetchingSessions: true};
    expect(reducer(initialState, actions.getTrendingSessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getTrendingSessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(sessionState, actions.getTrendingSessionsRequest()))
      .toStrictEqual(
        {
          ...sessionState,
          refreshingSessions: true,
          fetchingSessions: true,
        },
      );
  });

  it('handles GET_TRENDING_SESSIONS_SUCCESS', () => {
    const trendingIDs: Array<string> = ['foo', 'bar'];
    const trendingCanPaginate: boolean = true;
    const state: State = {...initialState, fetchingSessions: true};
    expect(reducer(state, actions.getTrendingSessionsSuccess(trendingIDs, trendingCanPaginate)))
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            ...initialState.explore,
            trendingIDs,
            trendingCanPaginate,
            trendingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('handles GET_TRENDING_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, refreshingSessions: true, fetchingSessions: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getTrendingSessionsFailure(error))).toStrictEqual(expectedState);
  });
});