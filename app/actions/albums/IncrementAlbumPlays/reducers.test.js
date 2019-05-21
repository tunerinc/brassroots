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

describe('increment album plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_ALBUM_PLAYS_REQUEST', () => {
    expect(reducer(initialState, actions.incrementAlbumPlaysRequest()))
      .toStrictEqual({...initialState, incrementingCount: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.incrementAlbumPlaysRequest(),
      ),
    )
      .toStrictEqual({...initialState, incrementingCount: true});
  });

  it('should handle INCREMENT_ALBUM_PLAYS_SUCCESS', () => {
    const albumID: string = 'foo';
    const userPlays: number = 1;
    const defaultAlbum: Album = {
      id: albumID,
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
    };

    expect(
      reducer(
        {...initialState, incrementingCount: true, albumsByID: {[albumID]: defaultAlbum}},
        actions.incrementAlbumPlaysSuccess(albumID, userPlays),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          albumsByID: {[albumID]: {...defaultAlbum, userPlays}},
        },
      );
  });

  it('should handle INCREMENT_ALBUM_PLAYS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, incrementingCount: true},
        actions.incrementAlbumPlaysFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});