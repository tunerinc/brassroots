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
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TOP_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingTopTracks: true};
    expect(reducer(state, actions.getPlaylistTopTracksRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.getPlaylistTopTracksRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle GET_PLAYLIST_TOP_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetchingTopTracks: true};
    expect(reducer(state, actions.getPlaylistTopTracksSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TOP_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetchingTopTracks: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getPlaylistTopTracksFailure(error))).toStrictEqual(expectedState);
  });
});