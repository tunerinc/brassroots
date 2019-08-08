'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('paginate nearby sessions synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.PAGINATE_NEARBY_SESSIONS_REQUEST};
    expect(actions.paginateNearbySessionsRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const sessions: Array<string> = ['foo', 'bar'];
    const nearbyCanPaginate: boolean = true;
    const expectedAction: Action = {
      type: types.PAGINATE_NEARBY_SESSIONS_SUCCESS,
      sessions,
      nearbyCanPaginate,
    };

    expect(actions.paginateNearbySessionsSuccess(sessions, nearbyCanPaginate))
      .toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.PAGINATE_NEARBY_SESSIONS_FAILURE,
      error,
    };

    expect(actions.paginateNearbySessionsFailure(error)).toStrictEqual(expectedAction);
  });
});