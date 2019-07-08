'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

describe('get following sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_FOLLOWING_SESSIONS_REQUEST', () => {
    expect(reducer(initialState, actions.getFollowingSessionsRequest()))
      .toStrictEqual({...initialState, fetchingSessions: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getFollowingSessionsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingSessions: true});

    expect(
      reducer(
        {...initialState, explore: {followingSessions: ['foo']}},
        actions.getFollowingSessionsRequest(),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          refreshingSessions: true,
          fetchingSessions: true,
          explore: {followingSessions: ['foo']},
        },
      );
  });

  it('should handle GET_FOLLOWING_SESSIONS_SUCCESS', () => {
    const followingSessions: Array<string> = ['foo', 'bar'];
    const followingCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, fetchingSessions: true},
        actions.getFollowingSessionsSuccess(followingSessions, followingCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            ...initialState.explore,
            followingSessions,
            followingCanPaginate,
            followingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle GET_FOLLOWING_SESSIONS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, refreshingSessions: true, fetchingSessions: true},
        actions.getFollowingSessionsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});