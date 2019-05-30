'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

describe('get nearby sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_NEARBY_SESSIONS_REQUEST', () => {
    expect(reducer(initialState, actions.getNearbySessionsRequest()))
      .toStrictEqual({...initialState, fetchingSessions: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getNearbySessionsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingSessions: true});

    expect(
      reducer(
        {...initialState, explore: {nearbySessions: ['foo']}},
        actions.getNearbySessionsRequest(),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          refreshingSessions: true,
          fetchingSessions: true,
          explore: {nearbySessions: ['foo']},
        },
      );
  });

  it('should handle GET_NEARBY_SESSIONS_SUCCESS', () => {
    const nearbySessions: Array<string> = ['foo', 'bar'];
    const nearbyCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, fetchingSessions: true},
        actions.getNearbySessionsSuccess(nearbySessions, nearbyCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            ...initialState.explore,
            nearbySessions,
            nearbyCanPaginate,
            nearbyLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle GET_NEARBY_SESSIONS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, refreshingSessions: true, fetchingSessions: true},
        actions.getNearbySessionsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});