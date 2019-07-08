'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLISTS_REQUEST', () => {
    const refreshingPlaylists: boolean = true;

    expect(reducer(initialState, actions.getPlaylistsRequest(refreshingPlaylists)))
      .toStrictEqual({...initialState, refreshingPlaylists, fetchingPlaylists: true});

    expect(reducer(initialState, actions.getPlaylistsRequest(!refreshingPlaylists)))
      .toStrictEqual({...initialState, fetchingPlaylists: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getPlaylistsRequest(refreshingPlaylists),
      ),
    )
      .toStrictEqual({...initialState, refreshingPlaylists, fetchingPlaylists: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getPlaylistsRequest(!refreshingPlaylists),
      ),
    )
      .toStrictEqual({...initialState, fetchingPlaylists: true});
  });

  it('should handle GET_PLAYLISTS_SUCCESS', () => {
    const userPlaylists: Array<string> = ['foo', 'bar'];

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true},
        actions.getPlaylistsSuccess([]),
      ),
    )
      .toStrictEqual({...initialState, canPaginate: false});

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true},
        actions.getPlaylistsSuccess(userPlaylists),
      ),
    )
      .toStrictEqual({...initialState, userPlaylists, canPaginate: false});

    expect(
      reducer(
        {...initialState, userPlaylists: ['xyz'], fetchingPlaylists: true},
        actions.getPlaylistsSuccess(userPlaylists),
      ),
    )
      .toStrictEqual({...initialState, userPlaylists: ['xyz', ...userPlaylists], canPaginate: false});

    expect(
      reducer(
        {...initialState, userPlaylists: ['xyz'], refreshingPlaylists: true, fetchingPlaylists: true},
        actions.getPlaylistsSuccess(userPlaylists),
      ),
    )
      .toStrictEqual({...initialState, userPlaylists, canPaginate: false});

    expect(
      reducer(
        {...initialState, userPlaylists: ['xyz'], refreshingPlaylists: true, fetchingPlaylists: true},
        actions.getPlaylistsSuccess([]),
      ),
    )
      .toStrictEqual({...initialState, userPlaylists: ['xyz'], canPaginate: false});
  });

  it('should handle GET_PLAYLISTS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, refreshingPlaylists: true, fetchingPlaylists: true},
        actions.getPlaylistsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});