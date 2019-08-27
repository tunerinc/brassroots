'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Playlist,
  type State,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlist top tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_PLAYLIST_TOP_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['topMembers']};
    const expectedState: State = {...initialState, fetching: ['topTracks']};
    const expectedStateTwo: State = {...initialState, fetching: ['topMembers', 'topTracks']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_PLAYLIST_TOP_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['topTracks']};
    const stateTwo: State = {...state, fetching: ['topTracks', 'topMembers']};
    const expectedState: State = {...initialState, fetching: ['topMembers']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_PLAYLIST_TOP_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['topTracks']};
    const stateTwo: State = {...initialState, fetching: ['topMembers', 'topTracks']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...initialState, error, fetching: ['topMembers']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});