'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from './actions';

describe('get recent tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_RECENT_TRACKS_REQUEST', () => {
    expect(reducer(initialState, actions.getRecentTracksRequest()))
      .toStrictEqual({...initialState, fetchingRecent: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getRecentTracksRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingRecent: true});
  });

  it('should handle GET_RECENT_TRACKS_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, fetchingRecent: true},
        actions.getRecentTracksSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle GET_RECENT_TRACKS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingRecent: true},
        actions.getRecentTracksFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});