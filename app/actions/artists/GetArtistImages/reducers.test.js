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

describe('get artist images reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_IMAGES_REQUEST', () => {
    expect(reducer(initialState, actions.getArtistImagesRequest()))
      .toStrictEqual({...initialState, fetchingImages: true, error: null});
  });

  it('should handle GET_ARTIST_IMAGES_SUCCESS', () => {
    const artist: Artist = {
      id: null,
      name: null,
      small: null,
      medium: null,
      large: null,
      albums: [],
      userPlays: 0,
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

    const artists: {
      +[id: string]: Artist,
    } = {
      foo: {
        small: 'foo',
        medium: 'foo',
        large: 'foo',
      },
      bar: {
        small: 'bar',
        medium: 'bar',
        large: 'bar',
      },
    };

    expect(
      reducer(
        {
          ...initialState,
          artistsByID: Object.keys(artists).reduce((artistList, artistID) => {
            return updateObject(artistList, {[artistID]: {...artist, id: artistID}});
          }, {}),
        },
        actions.getArtistImagesSuccess(artists),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          artistsByID: Object.keys(artists).reduce((artistList, artistID) => {
            return updateObject(artistList, {
              [artistID]: {
                ...artist,
                ...artists[artistID],
                id: artistID,
              },
            });
          }, {}),
        },
      );
  });

  it('should handle GET_ARTIST_IMAGES_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingImages: true, error: null},
        actions.getArtistImagesFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, fetchingImages: false});
  });
});