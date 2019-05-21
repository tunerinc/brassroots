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

describe('get album top tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ALBUM_TOP_TRACKS_REQUEST', () => {
    expect(reducer(initialState, actions.getAlbumTopTracksRequest()))
      .toStrictEqual({...initialState, fetchingTracks: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getAlbumTopTracksRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingTracks: true});
  });

  it('should handle GET_ALBUM_TOP_TRACKS_SUCCESS', () => {
    const topTracks: Array<string> = ['foo', 'bar'];
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
        {...initialState, fetchingTracks: true, albumsByID: {[albumID]: album}},
        actions.getAlbumTopTracksSuccess(albumID, topTracks),
      ),
    )
      .toStrictEqual({...initialState, albumsByID: {[albumID]: {...album, topTracks}}});
  });

  it('should handle GET_ALBUM_TOP_TRACKS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingTracks: true},
        actions.getAlbumTopTracksFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});