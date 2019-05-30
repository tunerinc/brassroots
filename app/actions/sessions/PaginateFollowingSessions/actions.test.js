'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('paginate following sessions synchronous action creators', () => {
  it('creates paginate following sessions request action', () => {
    const expectedAction: Action = {
      type: types.PAGINATE_FOLLOWING_SESSIONS_REQUEST,
    };

    expect(actions.paginateFollowingSessionsRequest()).toStrictEqual(expectedAction);
  });

  it('creates paginate following sessions success action', () => {
    const sessions: Array<string> = ['foo', 'bar'];
    const followingCanPaginate: boolean = true;
    const expectedAction: Action = {
      type: types.PAGINATE_FOLLOWING_SESSIONS_SUCCESS,
      sessions,
      followingCanPaginate,
    };

    expect(actions.paginateFollowingSessionsSuccess(sessions, followingCanPaginate))
      .toStrictEqual(expectedAction);
  });

  it('creates paginate following sessions failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.PAGINATE_FOLLOWING_SESSIONS_FAILURE,
      error,
    };

    expect(actions.paginateFollowingSessionsFailure(error)).toStrictEqual(expectedAction);
  });
});