'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/artists';
import * as actions from './actions';
import {type Artist} from '../../../reducers/artists';

describe('get artist top listeners reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_LISTENERS_REQUEST', () => {
    expect(reducer(initialState, actions.getArtistTopListenersRequest()))
      .toStrictEqual({...initialState, fetchingListeners: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getArtistTopListenersRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingListeners: true});
  });

  it('should handle GET_ARTIST_TOP_LISTENERS_SUCCESS', () => {
    const topListeners: Array<string> = ['foo', 'bar', 'xyz'];
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
        {...initialState, fetchingListeners: true, artistsByID: {[artistID]: artist}},
        actions.getArtistTopListenersSuccess(artistID, topListeners),
      ),
    )
      .toStrictEqual({...initialState, artistsByID: {[artistID]: {...artist, topListeners}}});
  });

  it('should handle GET_ARTIST_TOP_LISTENERS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingListeners: true},
        actions.getArtistTopListenersFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});