'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  lastUpdated,
  type Playlist,
  type PlaylistTrack,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('increment playlist plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_PLAYLIST_PLAYS_REQUEST', () => {
    expect(reducer(initialState, actions.incrementPlaylistPlaysRequest()))
      .toStrictEqual({...initialState, incrementingCount: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.incrementPlaylistPlaysRequest(),
      ),
    )
      .toStrictEqual({...initialState, incrementingCount: true});
  });

  it('should handle INCREMENT_PLAYLIST_PLAYS_SUCCESS', () => {
    const playlistID = 'foo';
    const playlistCount: number = 1;
    const trackID = 'foo';
    const trackCount: number = 1;
    const playlistTrackID = 'foo-foo';
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

    const track: PlaylistTrack = {
      playlistTrackID: 'foo-foo',
      trackID: 'foo',
      userID: 'foo',
      totalPlays: 0,
      userPlays: 0,
    };

    expect(
      reducer(
        {
          ...initialState,
          incrementingCount: true,
          playlistsByID: {[playlistID]: playlist},
          playlistTracksByID: {[playlistTrackID]: track},
        },
        actions.incrementPlaylistPlaysSuccess(playlistID, playlistCount, trackID, trackCount),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          lastUpdated,
          playlistsByID: {[playlistID]: {...playlist, userPlays: playlistCount, lastUpdated}},
          playlistTracksByID: {[playlistTrackID]: {...track, userPlays: trackCount, lastUpdated}},
        },
      );
  });

  it('should handle INCREMENT_PLAYLIST_PLAYS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, incrementingCount: true},
        actions.incrementPlaylistPlaysFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});