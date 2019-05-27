'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('get most played spotify track synchronous action creators', () => {
  it('creates get most played spotify track request action', () => {
    const expectedAction: Action = {
      type: types.GET_MOST_PLAYED_SPOTIFY_TRACK_REQUEST,
    };

    expect(actions.getMostPlayedSpotifyTrackRequest()).toStrictEqual(expectedAction);
  });

  it('creates get most played spotify track success action', () => {
    const expectedAction: Action = {
      type: types.GET_MOST_PLAYED_SPOTIFY_TRACK_SUCCESS,
    };

    expect(actions.getMostPlayedSpotifyTrackSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get most played spotify track failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_MOST_PLAYED_SPOTIFY_TRACK_FAILURE,
      error,
    };

    expect(actions.getMostPlayedSpotifyTrackFailure(error)).toStrictEqual(expectedAction);
  });
});