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

describe('paginate following sessions reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles PAGINATE_FOLLOWING_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, paginatingSessions: true};
    expect(reducer(state, actions.paginateFollowingSessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.paginateFollowingSessionsRequest()))
      .toStrictEqual(expectedState);
  });

  it('handles PAGINATE_FOLLOWING_SESSIONS_SUCCESS', () => {
    const sessions: Array<string> = ['bar', 'xyz'];
    const followingCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, paginatingSessions: true, explore: {followingIDs: ['foo']}},
        actions.paginateFollowingSessionsSuccess(sessions, followingCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            followingCanPaginate,
            followingIDs: ['foo', ...sessions],
            followingLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('handles PAGINATE_FOLLOWING_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, paginatingSessions: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.paginateFollowingSessionsFailure(error)))
      .toStrictEqual(expectedState);
  });
});