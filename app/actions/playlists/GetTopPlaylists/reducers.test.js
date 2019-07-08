'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get top playlists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_TOP_PLAYLISTS_REQUEST', () => {
    expect(reducer(initialState, actions.getTopPlaylistsRequest()))
      .toStrictEqual({...initialState, fetchingTopPlaylists: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getTopPlaylistsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingTopPlaylists: true});
  });

  it('should handle GET_TOP_PLAYLISTS_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, fetchingTopPlaylists: true},
        actions.getTopPlaylistsSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle GET_TOP_PLAYLISTS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingTopPlaylists: true},
        actions.getTopPlaylistsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});