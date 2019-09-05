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

const {explore} = initialState;

describe('get trending sessions reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_TRENDING_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['info']};
    const sessionState: State = {...state, explore: {...explore, trendingIDs: ['foo']}};
    const sessionStateTwo: State = {...stateTwo, explore: {...explore, trendingIDs: ['foo']}};
    const expectedState: State = {...initialState, fetching: ['trending']};
    const expectedStateTwo: State = {...initialState, fetching: ['info', 'trending']};
    const expectedSessionState: State = {
      ...sessionState,
      error: null,
      refreshing: true,
      fetching: ['trending'],
    };

    const expectedSessionStateTwo: State = {...expectedSessionState, fetching: ['info', 'trending']};

    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
    expect(reducer(sessionState, actions.request())).toStrictEqual(expectedSessionState);
    expect(reducer(sessionStateTwo, actions.request())).toStrictEqual(expectedSessionStateTwo);
  });

  it('handles GET_TRENDING_SESSIONS_SUCCESS', () => {
    const state: State = {...initialState, refreshing: true, fetching: ['trending']};
    const stateTwo: State = {...state, fetching: ['info', 'trending']};
    const expectedState: State = {...initialState, fetching: ['info']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_TRENDING_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, refreshing: true, fetching: ['trending']};
    const stateTwo: State = {...state, fetching: ['info', 'trending']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['info']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});