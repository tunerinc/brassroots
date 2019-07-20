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
    const totalUserPlaylists: number = 10;

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true},
        actions.getPlaylistsSuccess([], 0),
      ),
    )
      .toStrictEqual(initialState);

    expect(
      reducer(
        {...initialState, fetchingPlaylists: true},
        actions.getPlaylistsSuccess(userPlaylists, totalUserPlaylists),
      ),
    )
      .toStrictEqual({...initialState, userPlaylists, totalUserPlaylists});

    expect(
      reducer(
        {...initialState, totalUserPlaylists, userPlaylists: ['xyz'],fetchingPlaylists: true},
        actions.getPlaylistsSuccess(userPlaylists, totalUserPlaylists),
      ),
    )
      .toStrictEqual({...initialState, totalUserPlaylists, userPlaylists: ['xyz', ...userPlaylists]});

    expect(
      reducer(
        {
          ...initialState,
          totalUserPlaylists,
          userPlaylists: ['xyz'],
          refreshingPlaylists: true,
          fetchingPlaylists: true,
        },
        actions.getPlaylistsSuccess(userPlaylists, totalUserPlaylists),
      ),
    )
      .toStrictEqual({...initialState, userPlaylists, totalUserPlaylists});
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