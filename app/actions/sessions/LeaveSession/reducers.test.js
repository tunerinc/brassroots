'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
  type Session,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('leave session reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles LEAVE_SESSION_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, leaving: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles LEAVE_SESSION_SUCCESS', () => {
    const isOwner: boolean = true;
    const state: State = {
      ...initialState,
      leaving: true,
      currentSessionID: 'foo',
      explore: {...initialState.explore, trendingIDs: ['bar', 'foo']},
    };

    const expectedState: State = {
      ...initialState,
      explore: {...initialState.explore, trendingIDs: ['bar']},
    };

    expect(reducer(state, actions.success(isOwner))).toStrictEqual(expectedState);
  });

  it('handles LEAVE_SESSION_FAILURE', () => {
    const state: State = {...initialState, leaving: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});