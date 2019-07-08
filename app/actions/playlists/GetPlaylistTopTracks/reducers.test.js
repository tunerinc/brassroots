'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Playlist,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlist top tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TOP_TRACKS_REQUEST', () => {
    expect(reducer(initialState, actions.getPlaylistTopTracksRequest()))
      .toStrictEqual({...initialState, fetchingTopTracks: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getPlaylistTopTracksRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingTopTracks: true});
  });

  it('should handle GET_PLAYLIST_TOP_TRACKS_SUCCESS', () => {
    const tracks: Array<string> = ['foo', 'bar'];
    const topTracks: Array<string> = ['foo-foo', 'foo-bar'];
    const playlistID: string = 'foo';
    const playlist: Playlist = {
      id: 'foo',
      name: 'foo',
      ownerID: 'foo',
      image: 'foo',
      private: false,
      members: [],
      tracks: [],
      topTracks: [],
      totalPlays: 0,
      userPlays: 0,
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {...initialState, fetchingTopTracks: true, playlistsByID: {[playlistID]: playlist}},
        actions.getPlaylistTopTracksSuccess(playlistID, tracks),
      ),
    )
      .toStrictEqual({...initialState, playlistsByID: {[playlistID]: {...playlist, topTracks}}});
  });

  it('should handle GET_PLAYLIST_TOP_TRACKS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingTopTracks: true},
        actions.getPlaylistTopTracksFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});