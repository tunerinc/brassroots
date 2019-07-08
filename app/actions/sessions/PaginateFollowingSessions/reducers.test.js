'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

describe('paginate following sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PAGINATE_FOLLOWING_SESSIONS_REQUEST', () => {
    expect(reducer(initialState, actions.paginateFollowingSessionsRequest()))
      .toStrictEqual({...initialState, paginatingSessions: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.paginateFollowingSessionsRequest(),
      ),
    )
      .toStrictEqual({...initialState, paginatingSessions: true});
  });

  it('should handle PAGINATE_FOLLOWING_SESSIONS_SUCCESS', () => {
    const sessions: Array<string> = ['bar', 'xyz'];
    const followingCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, paginatingSessions: true, explore: {followingSessions: ['foo']}},
        actions.paginateFollowingSessionsSuccess(sessions, followingCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            followingCanPaginate,
            followingSessions: ['foo', ...sessions],
            followingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle PAGINATE_FOLLOWING_SESSIONS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, paginatingSessions: true},
        actions.paginateFollowingSessionsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});