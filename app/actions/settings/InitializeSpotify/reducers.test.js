'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('initialize spotify reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INITIALIZE_SPOTIFY_REQUEST', () => {
    expect(reducer(initialState, actions.initializeSpotifyRequest()))
      .toStrictEqual({...initialState, initializing: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.initializeSpotifyRequest(),
      ),
    )
      .toStrictEqual({...initialState, initializing: true});
  });

  it('should handle INITIALIZE_SPOTIFY_SUCCESS', () => {
    const loggedIn: boolean = true;

    expect(
      reducer(
        {...initialState, initializing: true},
        actions.initializeSpotifySuccess(loggedIn),
      ),
    )
      .toStrictEqual({...initialState, loggedIn});
  });

  it('should handle INITIALIZE_SPOTIFY_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, initializing: true},
        actions.initializeSpotifyFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});