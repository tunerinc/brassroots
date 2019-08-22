'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Artist,
  type State,
} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artist top tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ARTIST_TOP_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['artists']};
    const expectedState: State = {...initialState, fetching: ['topTracks']};
    const expectedStateTwo: State = {...initialState, fetching: ['artists', 'topTracks']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_ARTIST_TOP_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['topTracks']};
    const stateTwo: State = {...initialState, fetching: ['artists', 'topTracks']};
    const expectedState: State = {...initialState, fetching: ['artists']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_ARTIST_TOP_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['topTracks']};
    const stateTwo: State = {...initialState, fetching: ['artists', 'topTracks']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['artists']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});