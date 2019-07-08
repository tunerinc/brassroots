'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from './actions';

describe('get most played tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_MOST_PLAYED_TRACKS_REQUEST', () => {
    expect(reducer(initialState, actions.getMostPlayedTracksRequest()))
      .toStrictEqual({...initialState, fetchingMostPlayed: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getMostPlayedTracksRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingMostPlayed: true});
  });

  it('should handle GET_MOST_PLAYED_TRACKS_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, fetchingMostPlayed: true},
        actions.getMostPlayedTracksSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle GET_MOST_PLAYED_TRACKS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingMostPlayed: true},
        actions.getMostPlayedTracksFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});