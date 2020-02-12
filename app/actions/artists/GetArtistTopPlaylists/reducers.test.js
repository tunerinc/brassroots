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

describe('get artist top playlists reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ARTIST_TOP_PLAYLISTS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['artists']};
    const expectedState: State = {...initialState, fetching: ['topPlaylists']};
    const expectedStateTwo: State = {...initialState, fetching: ['artists', 'topPlaylists']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_ARTIST_TOP_PLAYLISTS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['topPlaylists']};
    const stateTwo: State = {...initialState, fetching: ['artists', 'topPlaylists']};
    const expectedState: State = {...initialState, fetching: ['artists']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_ARTIST_TOP_PLAYLISTS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['topPlaylists']};
    const stateTwo: State = {...initialState, fetching: ['artists', 'topPlaylists']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['artists']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});