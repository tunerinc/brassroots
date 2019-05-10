'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('initialize spotify synchronous action creators', () => {
  it('creates initialize spotify request action', () => {
    const expectedAction: Action = {
      type: types.INITIALIZE_SPOTIFY_REQUEST,
    };

    expect(actions.initializeSpotifyRequest()).toStrictEqual(expectedAction);
  });

  it('creates initialize spotify success action', () => {
    const loggedIn: boolean = true;
    const expectedAction: Action = {
      type: types.INITIALIZE_SPOTIFY_SUCCESS,
      loggedIn,
    };

    expect(actions.initializeSpotifySuccess(loggedIn)).toStrictEqual(expectedAction);
  });

  it('creates initialize spotify failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.INITIALIZE_SPOTIFY_FAILURE,
      error,
    };

    expect(actions.initializeSpotifyFailure(error)).toStrictEqual(expectedAction);
  });
});