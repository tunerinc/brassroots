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

describe('paginate nearby sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle PAGINATE_NEARBY_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, paginatingSessions: true};
    expect(reducer(state, actions.paginateNearbySessionsRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.paginateNearbySessionsRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle PAGINATE_NEARBY_SESSIONS_SUCCESS', () => {
    const sessions: Array<string> = ['bar', 'xyz'];
    const nearbyCanPaginate: boolean = true;

    expect(
      reducer(
        {...initialState, paginatingSessions: true, explore: {nearbyIDs: ['foo']}},
        actions.paginateNearbySessionsSuccess(sessions, nearbyCanPaginate),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          explore: {
            nearbyCanPaginate,
            nearbyIDs: ['foo', ...sessions],
            nearbyLastUpdated: initialState.lastUpdated,
          },
        },
      );
  });

  it('should handle PAGINATE_NEARBY_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, paginatingSessions: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.paginateNearbySessionsFailure(error))).toStrictEqual(expectedState);
  });
});