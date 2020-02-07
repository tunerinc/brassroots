'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artists reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ARTISTS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['topTracks']};
    const expectedState: State = {...initialState, fetching: ['artists']};
    const expectedStateTwo: State = {...initialState, fetching: ['topTracks', 'artists']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_ARTISTS_SUCCESS', () => {
    const userArtists: Array<string> = ['bar', 'xyz'];
    const state: State = {...initialState, fetching: ['artists']};
    const stateTwo: State = {...initialState, fetching: ['artists', 'topTracks']};
    const expectedState: State = {...initialState, userArtists, totalUserArtists: 2};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    expect(reducer(state, actions.success(userArtists))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.success(userArtists))).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_ARTISTS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['artists']};
    const stateTwo: State = {...initialState, fetching: ['artists', 'topTracks']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});