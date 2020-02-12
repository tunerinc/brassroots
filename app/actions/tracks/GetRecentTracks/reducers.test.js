'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/tracks';
import * as actions from './actions';

describe('get recent tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_RECENT_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['favorite']};
    const expectedState: State = {...initialState, fetching: ['recent']};
    const expectedStateTwo: State = {...initialState, fetching: ['favorite', 'recent']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_RECENT_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['recent']};
    const stateTwo: State = {...initialState, fetching: ['favorite', 'recent']};
    const expectedState: State = {...initialState, fetching: ['favorite']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_RECENT_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['recent']};
    const stateTwo: State = {...initialState, fetching: ['favorite', 'recent']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error: new Error('error')};
    const expectedStateTwo: State = {...expectedState, fetching: ['favorite']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});