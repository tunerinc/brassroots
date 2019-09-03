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

describe('get most played tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_MOST_PLAYED_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['favorite']};
    const expectedState: State = {...initialState, fetching: ['mostPlayed']};
    const expectedStateTwo: State = {...initialState, fetching: ['favorite', 'mostPlayed']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_MOST_PLAYED_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['mostPlayed']};
    const stateTwo: State = {...initialState, fetching: ['favorite', 'mostPlayed']};
    const expectedState: State = {...initialState, fetching: ['favorite']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_MOST_PLAYED_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['mostPlayed']};
    const stateTwo: State = {...initialState, fetching: ['favorite', 'mostPlayed']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error: new Error('error')};
    const expectedStateTwo: State = {...expectedState, fetching: ['favorite']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});