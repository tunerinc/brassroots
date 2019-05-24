'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('get playlists synchronous action creators', () => {
  it('creates get playlists request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_PLAYLISTS_REQUEST,
      refreshing,
    };

    expect(actions.getPlaylistsRequest(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get playlists success action', () => {
    const playlists: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.GET_PLAYLISTS_SUCCESS,
      playlists,
    };

    expect(actions.getPlaylistsSuccess(playlists)).toStrictEqual(expectedAction);
  });

  it('creates get playlists failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_PLAYLISTS_FAILURE,
      error,
    };

    expect(actions.getPlaylistsFailure(error)).toStrictEqual(expectedAction);
  });
});