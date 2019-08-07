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

describe('get playlist tracks reducer', () => {
  it('should create initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const refreshingTracks: boolean = true;
    const expectedState: State = {...initialState, fetchingTracks: true, error: null};
    const refreshingState: State = {...expectedState, refreshingTracks};

    expect(reducer(initialState, actions.getPlaylistTracksRequest(refreshingTracks)))
      .toStrictEqual(refreshingState);

    expect(reducer(initialState, actions.getPlaylistTracksRequest(!refreshingTracks)))
      .toStrictEqual(expectedState);

    expect(reducer(state, actions.getPlaylistTracksRequest(refreshingTracks)))
      .toStrictEqual(refreshingState);

    expect(reducer(state, actions.getPlaylistTracksRequest(!refreshingTracks)))
      .toStrictEqual(expectedState);
  });

  it('should handle GET_PLAYLIST_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetchingTracks: true};
    const refreshingState: State = {...state, refreshingTracks: true};
    expect(reducer(state, actions.getPlaylistTracksSuccess())).toStrictEqual(initialState);
    expect(reducer(refreshingState, actions.getPlaylistTracksSuccess())).toStrictEqual(initialState);
    expect(reducer(state, actions.getPlaylistTracksSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TRACKS_FAILURE', () => {
    const state: State = {...initialState, refreshingTracks: true, fetchingTracks: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getPlaylistTracksFailure(error))).toStrictEqual(expectedState);
  });
});