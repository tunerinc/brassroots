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

describe('get artist top tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_TRACKS_REQUEST', () => {
    expect(reducer(initialState, actions.getArtistTopTracksRequest()))
      .toStrictEqual({...initialState, fetchingTracks: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getArtistTopTracksRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingTracks: true});
  });

  it('should handle GET_ARTIST_TOP_TRACKS_SUCCESS', () => {
    const topTracks: Array<string> = ['foo', 'bar', 'xyz'];
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
        {...initialState, fetchingTracks: true, artistsByID: {[artistID]: artist}},
        actions.getArtistTopTracksSuccess(artistID, topTracks),
      ),
    )
      .toStrictEqual({...initialState, artistsByID: {[artistID]: {...artist, topTracks}}});
  });

  it('should handle GET_ARTIST_TOP_TRACKS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingTracks: true},
        actions.getArtistTopTracksFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});