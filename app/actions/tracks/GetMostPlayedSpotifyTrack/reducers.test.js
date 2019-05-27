'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from './actions';

describe('get most played spotify track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_MOST_PLAYED_SPOTIFY_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.getMostPlayedSpotifyTrackRequest()))
      .toStrictEqual({...initialState, fetchingFavoriteTrack: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getMostPlayedSpotifyTrackRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingFavoriteTrack: true});
  });

  it('should handle GET_MOST_PLAYED_SPOTIFY_TRACK_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, fetchingFavoriteTrack: true},
        actions.getMostPlayedSpotifyTrackSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle GET_MOST_PLAYED_SPOTIFY_TRACK_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingFavoriteTrack: true},
        actions.getMostPlayedSpotifyTrackFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});