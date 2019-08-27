'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlists reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_PLAYLISTS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['topTracks']};
    const refreshing: boolean = true;
    const expectedState: State = {...initialState, fetching: ['playlists']};
    const expectedStateTwo: State = {...initialState, fetching: ['topTracks', 'playlists']};
    const refreshState: State = {...expectedState, refreshing: ['playlists']};
    const refreshStateTwo: State = {...expectedStateTwo, refreshing: ['playlists']};
    expect(reducer(initialState, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(initialState, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(state, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(state, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request(refreshing))).toStrictEqual(refreshStateTwo);
    expect(reducer(stateTwo, actions.request(!refreshing))).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_PLAYLISTS_SUCCESS', () => {
    const userPlaylists: Array<string> = ['bar', 'xyz'];
    const totalUserPlaylists: number = 5;
    const state: State = {...initialState, fetching: ['playlists']};
    const stateTwo: State = {...initialState, fetching: ['playlists', 'topTracks']};
    const playlistState: State = {...state, userPlaylists: ['xyz']};
    const playlistStateTwo: State = {...playlistState, fetching: ['topTracks']};
    const refreshState: State = {...playlistState, refreshing: ['playlists']};
    const refreshStateTwo: State = {...playlistStateTwo, refreshing: ['playlists']};
    const expectedState: State = {...initialState, totalUserPlaylists, userPlaylists};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    const playlistExpectedState: State = {...expectedState, userPlaylists: ['xyz', ...userPlaylists]};
    const playlistExpectedStateTwo: State = {...playlistExpectedState, fetching: ['topTracks']};

    expect(reducer(state, actions.success(userPlaylists, totalUserPlaylists)))
      .toStrictEqual(expectedState);

    expect(reducer(stateTwo, actions.success(userPlaylists, totalUserPlaylists)))
      .toStrictEqual(expectedStateTwo);

    expect(reducer(refreshState, actions.success(userPlaylists, totalUserPlaylists)))
      .toStrictEqual(expectedState);

    expect(reducer(refreshStateTwo, actions.success(userPlaylists, totalUserPlaylists)))
      .toStrictEqual(expectedStateTwo);

    expect(reducer(playlistState, actions.success(userPlaylists, totalUserPlaylists)))
      .toStrictEqual(playlistExpectedState);

    expect(reducer(playlistStateTwo, actions.success(userPlaylists, totalUserPlaylists)))
      .toStrictEqual(playlistExpectedStateTwo);
  });

  it('handles GET_PLAYLISTS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['playlists']};
    const stateTwo: State = {...initialState, fetching: ['playlists', 'topTracks']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});