'use strict';

import reducer, {
  initialState,
  type Artist,
} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artist top playlists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_PLAYLISTS_REQUEST', () => {
    expect(reducer(initialState, actions.getArtistTopPlaylistsRequest()))
      .toStrictEqual({...initialState, fetchingPlaylists: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getArtistTopPlaylistsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingPlaylists: true});
  });

  it('should handle GET_ARTIST_TOP_PLAYLISTS_SUCCESS', () => {
    const topPlaylists: Array<string> = ['foo', 'bar', 'xyz'];
    const artistID: string = 'foo';
    const artist: Artist = {
      id: 'foo',
      name: null,
      image: null,
      albums: [],
      totalPlays: 0,
      userAlbums: [],
      userTracks: [],
      topAlbums: [],
      topListeners: [],
      topPlaylists: [],
      topTracks: [],
      userProfile: null,
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true, artistsByID: {[artistID]: artist}},
        actions.getArtistTopPlaylistsSuccess(artistID, topPlaylists),
      ),
    )
      .toStrictEqual({...initialState, artistsByID: {[artistID]: {...artist, topPlaylists}}});
  });

  it('should handle GET_ARTIST_TOP_PLAYLISTS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true},
        actions.getArtistTopPlaylistsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});