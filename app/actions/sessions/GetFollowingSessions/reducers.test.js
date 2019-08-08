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

describe('get following sessions reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_FOLLOWING_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const sessionState: State = {...state, explore: {followingIDs: ['foo']}};
    const expectedState: State = {...initialState, fetchingSessions: true};
    expect(reducer(state, actions.getFollowingSessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.getFollowingSessionsRequest()))
      .toStrictEqual(expectedState);
    expect(reducer(sessionState, actions.getFollowingSessionsRequest()))
      .toStrictEqual(
        {
          ...initialState,
          refreshingSessions: true,
          fetchingSessions: true,
          explore: {followingIDs: ['foo']},
        },
      );
  });

  it('handles GET_FOLLOWING_SESSIONS_SUCCESS', () => {
    const followingIDs: Array<string> = ['foo', 'bar'];
    const followingCanPaginate: boolean = true;
    const state: State = {...initialState, fetchingSessions: true};

    expect(reducer(state, actions.getFollowingSessionsSuccess(followingIDs, followingCanPaginate)))
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            ...initialState.explore,
            followingIDs,
            followingCanPaginate,
            followingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('handles GET_FOLLOWING_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, refreshingSessions: true, fetchingSessions: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getFollowingSessionsFailure(error))).toStrictEqual(expectedState);
  });
});