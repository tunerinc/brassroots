'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTISTS_REQUEST', () => {
    const refreshingArtists: boolean = true;

    expect(reducer(initialState, actions.getArtistsRequest(!refreshingArtists)))
      .toStrictEqual({...initialState, fetchingArtists: true});

    expect(reducer(initialState, actions.getArtistsRequest(refreshingArtists)))
      .toStrictEqual({...initialState, refreshingArtists, fetchingArtists: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getArtistsRequest(!refreshingArtists),
      ),
    )
      .toStrictEqual({...initialState, fetchingArtists: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getArtistsRequest(refreshingArtists),
      ),
    )
      .toStrictEqual({...initialState, refreshingArtists, fetchingArtists: true});
  });

  it('should handle GET_ARTISTS_SUCCESS', () => {
    const userArtists: Array<string> = ['bar', 'xyz'];
    const refreshingArtists: boolean = true;

    expect(
      reducer(
        {...initialState, refreshingArtists, fetchingArtists: true},
        actions.getArtistsSuccess(userArtists),
      ),
    )
      .toStrictEqual({...initialState, userArtists});

    expect(
      reducer(
        {...initialState, refreshingArtists, userArtists: ['xyz'], fetchingArtists: true},
        actions.getArtistsSuccess(userArtists),
      ),
    )
      .toStrictEqual({...initialState, userArtists});
  });

  it('should handle GET_ARTISTS_FAILURE', () => {
    const error: Error = new Error('error');
    const refreshingArtists: boolean = true;

    expect(
      reducer(
        {...initialState, refreshingArtists, fetchingArtists: true},
        actions.getArtistsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});