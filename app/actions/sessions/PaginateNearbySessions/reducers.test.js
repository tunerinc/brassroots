'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

describe('paginate nearby sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PAGINATE_NEARBY_SESSIONS_REQUEST', () => {
    expect(reducer(initialState, actions.paginateNearbySessionsRequest()))
      .toStrictEqual({...initialState, paginatingSessions: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.paginateNearbySessionsRequest(),
      ),
    )
      .toStrictEqual({...initialState, paginatingSessions: true});
  });

  it('should handle PAGINATE_NEARBY_SESSIONS_SUCCESS', () => {
    const sessions: Array<string> = ['bar', 'xyz'];
    const nearbyCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, paginatingSessions: true, explore: {nearbySessions: ['foo']}},
        actions.paginateNearbySessionsSuccess(sessions, nearbyCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            nearbyCanPaginate,
            nearbySessions: ['foo', ...sessions],
            nearbyLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle PAGINATE_NEARBY_SESSIONS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, paginatingSessions: true},
        actions.paginateNearbySessionsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});