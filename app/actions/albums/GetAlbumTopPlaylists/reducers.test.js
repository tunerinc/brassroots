'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Album,
} from '../../../reducers/albums';
import * as actions from './actions';

describe('get album top playlists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ALBUM_TOP_PLAYLISTS_REQUEST', () => {
    expect(reducer(initialState, actions.getAlbumTopPlaylistsRequest()))
      .toStrictEqual({...initialState, fetchingPlaylists: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getAlbumTopPlaylistsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingPlaylists: true});
  });

  it('should handle GET_ALBUM_TOP_PLAYLISTS_SUCCESS', () => {
    const topPlaylists: Array<string> = ['foo', 'bar'];
    const albumID: string = 'foo';
    const album: Album = {
      id: 'foo',
      name: null,
      small: null,
      medium: null,
      large: null,
      artists: [],
      tracks: [],
      totalPlays: 0,
      userPlays: 0,
      userTracks: [],
      topListeners: [],
      topPlaylists: [],
      topTracks: [],
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true, albumsByID: {[albumID]: album}},
        actions.getAlbumTopPlaylistsSuccess(albumID, topPlaylists),
      ),
    )
      .toStrictEqual({...initialState, albumsByID: {[albumID]: {...album, topPlaylists}}});
  });

  it('should handle GET_ALBUM_TOP_PLAYLISTS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true},
        actions.getAlbumTopPlaylistsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});