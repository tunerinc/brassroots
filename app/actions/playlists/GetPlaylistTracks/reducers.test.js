'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlist tracks reducer', () => {
  it('should create initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TRACKS_REQUEST', () => {
    const refreshingTracks: boolean = true;

    expect(reducer(initialState, actions.getPlaylistTracksRequest(refreshingTracks)))
      .toStrictEqual({...initialState, refreshingTracks, fetchingTracks: true, error: null});

    expect(reducer(initialState, actions.getPlaylistTracksRequest(!refreshingTracks)))
      .toStrictEqual({...initialState, fetchingTracks: true, error: null});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getPlaylistTracksRequest(refreshingTracks),
      ),
    )
      .toStrictEqual({...initialState, refreshingTracks, fetchingTracks: true, error: null});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getPlaylistTracksRequest(!refreshingTracks),
      ),
    )
      .toStrictEqual({...initialState, fetchingTracks: true, error: null});
  });

  it('should handle GET_PLAYLIST_TRACKS_SUCCESS', () => {
    const playlistID: string = 'foo';
    const tracks: Array<string> = ['foo-foo', 'foo-bar'];

    expect(
      reducer(
        {
          ...initialState,
          fetchingTracks: true,
          playlistsByID: {
            [playlistID]: {
              id: 'foo',
              name: 'foo',
              ownerID: 'foo',
              ownerType: 'foo',
              image: 'foo',
              mode: 'foo',
              public: true,
              members: [],
              tracks: [],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
        actions.getPlaylistTracksSuccess(playlistID, tracks),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          playlistsByID: {
            [playlistID]: {
              id: 'foo',
              name: 'foo',
              ownerID: 'foo',
              ownerType: 'foo',
              image: 'foo',
              mode: 'foo',
              public: true,
              members: [],
              tracks: tracks.map(trackID => `${playlistID}-${trackID}`),
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          fetchingTracks: true,
          refreshingTracks: true,
          playlistsByID: {
            [playlistID]: {
              id: 'foo',
              name: 'foo',
              ownerID: 'foo',
              ownerType: 'foo',
              image: 'foo',
              mode: 'foo',
              public: true,
              members: [],
              tracks: ['foo-xyz'],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
        actions.getPlaylistTracksSuccess(playlistID, tracks),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          playlistsByID: {
            [playlistID]: {
              id: 'foo',
              name: 'foo',
              ownerID: 'foo',
              ownerType: 'foo',
              image: 'foo',
              mode: 'foo',
              public: true,
              members: [],
              tracks: tracks.map(trackID => `${playlistID}-${trackID}`),
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          fetchingTracks: true,
          playlistsByID: {
            [playlistID]: {
              id: 'foo',
              name: 'foo',
              ownerID: 'foo',
              ownerType: 'foo',
              image: 'foo',
              mode: 'foo',
              public: true,
              members: [],
              tracks: ['foo-xyz'],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
        actions.getPlaylistTracksSuccess(playlistID, tracks),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          playlistsByID: {
            [playlistID]: {
              id: 'foo',
              name: 'foo',
              ownerID: 'foo',
              ownerType: 'foo',
              image: 'foo',
              mode: 'foo',
              public: true,
              members: [],
              tracks: ['foo-xyz', ...tracks.map(trackID => `${playlistID}-${trackID}`)],
              topTracks: [],
              totalPlays: 0,
              userPlays: 0,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
      );
  });

  it('should handle GET_PLAYLIST_TRACKS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, refreshingTracks: true, fetchingTracks: true},
        actions.getPlaylistTracksFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});