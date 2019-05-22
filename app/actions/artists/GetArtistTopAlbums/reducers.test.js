'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Artist,
} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artist top albums reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_REQUEST', () => {
    expect(reducer(initialState, actions.getArtistTopAlbumsRequest()))
      .toStrictEqual({...initialState, fetchingAlbums: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getArtistTopAlbumsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingAlbums: true});
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_SUCCESS', () => {
    const topAlbums: Array<string> = ['foo', 'bar', 'xyz'];
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
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {...initialState, fetchingAlbums: true, artistsByID: {[artistID]: artist}},
        actions.getArtistTopAlbumsSuccess(artistID, topAlbums),
      ),
    )
      .toStrictEqual({...initialState, artistsByID: {[artistID]: {...artist, topAlbums}}});
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingAlbums: true},
        actions.getArtistTopAlbumsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});