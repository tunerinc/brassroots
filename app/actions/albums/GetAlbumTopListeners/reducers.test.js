'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/albums';
import * as actions from './actions';
import {type Album} from '../../../reducers/albums';

describe('get album top listeners reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ALBUM_TOP_LISTENERS_REQUEST', () => {
    expect(reducer(initialState, actions.getAlbumTopListenersRequest()))
      .toStrictEqual({...initialState, fetchingListeners: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getAlbumTopListenersRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingListeners: true});
  });

  it('should handle GET_ALBUM_TOP_LISTENERS_SUCCESS', () => {
    const topListeners: Array<string> = ['foo', 'bar'];
    const albumID = 'foo';
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
        {...initialState, fetchingListeners: true, albumsByID: {[albumID]: album}},
        actions.getAlbumTopListenersSuccess(albumID, topListeners),
      ),
    )
      .toStrictEqual({...initialState, albumsByID: {[albumID]: {...album, topListeners}}});
  });

  it('should handle GET_ALBUM_TOP_LISTENERS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingListeners: true},
        actions.getAlbumTopListenersFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});