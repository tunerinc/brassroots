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

describe('get nearby sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_NEARBY_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const sessionState: State = {...initialState, explore: {nearbyIDs: ['foo']}};
    const expectedState: State = {...initialState, fetchingSessions: true};
    expect(reducer(initialState, actions.getNearbySessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getNearbySessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(sessionState, actions.getNearbySessionsRequest()))
      .toStrictEqual(
        {
          ...initialState,
          refreshingSessions: true,
          fetchingSessions: true,
          explore: {nearbyIDs: ['foo']},
        },
      );
  });

  it('should handle GET_NEARBY_SESSIONS_SUCCESS', () => {
    const nearbyIDs: Array<string> = ['foo', 'bar'];
    const nearbyCanPaginate: boolean = true;
    const state: State = {...initialState, fetchingSessions: true};

    expect(reducer(state, actions.getNearbySessionsSuccess(nearbyIDs, nearbyCanPaginate)))
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            ...initialState.explore,
            nearbyIDs,
            nearbyCanPaginate,
            nearbyLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle GET_NEARBY_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, refreshingSessions: true, fetchingSessions: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getNearbySessionsFailure(error))).toStrictEqual(expectedState);
  });
});