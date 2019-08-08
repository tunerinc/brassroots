'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('get following sessions synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.GET_FOLLOWING_SESSIONS_REQUEST};
    expect(actions.getFollowingSessionsRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const followingIDs: Array<string> = ['foo', 'bar'];
    const followingCanPaginate: boolean = true;
    const expectedAction: Action = {
      type: types.GET_FOLLOWING_SESSIONS_SUCCESS,
      followingIDs,
      followingCanPaginate,
    };

    expect(actions.getFollowingSessionsSuccess(followingIDs, followingCanPaginate))
      .toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_FOLLOWING_SESSIONS_FAILURE,
      error,
    };

    expect(actions.getFollowingSessionsFailure(error)).toStrictEqual(expectedAction);
  });
});