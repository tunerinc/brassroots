'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Artist,
} from '../../../reducers/artists';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('increment artist plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_ARTIST_PLAYS_REQUEST', () => {
    expect(reducer(initialState, actions.incrementArtistPlaysRequest()))
      .toStrictEqual({...initialState, incrementingCount: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.incrementArtistPlaysRequest(),
      ),
    )
      .toStrictEqual({...initialState, incrementingCount: true});
  });

  it('should handle INCREMENT_ARTIST_PLAYS_SUCCESS', () => {
    const artists: Array<string> = ['foo', 'bar'];
    const artistCounts: Array<number> = [1, 1];
    const artist: Artist = {
      name: null,
      image: null,
      albums: [],
      userPlays: 0,
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
        {
          ...initialState,
          incrementingCount: true,
          artistsByID: {...artists.reduce((obj, id) => {
            return updateObject(obj, {[id]: {...artist, id}});
          }, {})},
        },
        actions.incrementArtistPlaysSuccess(artists, artistCounts),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          artistsByID: {...artists.reduce((obj, id) => {
            return updateObject(obj, {[id]: {...artist, id, userPlays: 1}});
          }, {})},
        },
      );
  });

  it('should handle INCREMENT_ARTIST_PLAYS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.incrementArtistPlaysFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});