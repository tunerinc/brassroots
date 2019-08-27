'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Album,
  type State,
} from '../../../reducers/albums';
import * as actions from './actions';

describe('get album top playlists reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_PLAYLISTS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['topListeners']};
    const expectedState: State = {...initialState, fetching: ['topPlaylists']};
    const expectedStateTwo: State = {...initialState, fetching: ['topListeners', 'topPlaylists']};
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles GET_ALBUM_TOP_PLAYLISTS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['topPlaylists']};
    const stateTwo: State = {...initialState, fetching: ['topPlaylists', 'topTracks']};
    const expectedState: State = {...initialState, fetching: ['topTracks']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_ALBUM_TOP_PLAYLISTS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['topPlaylists']};
    const stateTwo: State = {...initialState, fetching: ['topPlaylists', 'topTracks']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});