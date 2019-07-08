'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('get following sessions synchronous action creators', () => {
  it('creates get following sessions request action', () => {
    const expectedAction: Action = {
      type: types.GET_FOLLOWING_SESSIONS_REQUEST,
    };

    expect(actions.getFollowingSessionsRequest()).toStrictEqual(expectedAction);
  });

  it('creates get following sessions success action', () => {
    const followingSessions: Array<string> = ['foo', 'bar'];
    const followingCanPaginate: boolean = true;
    const expectedAction: Action = {
      type: types.GET_FOLLOWING_SESSIONS_SUCCESS,
      followingSessions,
      followingCanPaginate,
    };

    expect(actions.getFollowingSessionsSuccess(followingSessions, followingCanPaginate))
      .toStrictEqual(expectedAction);
  });

  it('creates get following sessions failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_FOLLOWING_SESSIONS_FAILURE,
      error,
    };

    expect(actions.getFollowingSessionsFailure(error)).toStrictEqual(expectedAction);
  });
});