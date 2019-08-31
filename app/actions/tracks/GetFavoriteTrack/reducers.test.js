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

describe('get favorite track reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_FAVORITE_TRACK_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['tracks']};
    const expectedState: State = {...initialState, fetching: ['favorite']};
    const expectedStateTwo: State = {...initialState, fetching: ['tracks', 'favorite']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_FAVORITE_TRACK_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['favorite']};
    const stateTwo: State = {...initialState, fetching: ['tracks', 'favorite']};
    const expectedState: State = {...initialState, fetching: ['tracks']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_FAVORITE_TRACK_FAILURE', () => {
    const state: State = {...initialState, fetching: ['favorite']};
    const stateTwo: State = {...initialState, fetching: ['tracks', 'favorite']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error: new Error('error')};
    const expectedStateTwo: State = {...expectedState, fetching: ['tracks']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});