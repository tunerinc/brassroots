'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('get playlist tracks synchronous action creators', () => {
  it('creates get playlist tracks request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_PLAYLIST_TRACKS_REQUEST,
      refreshing,
    };

    expect(actions.getPlaylistTracksRequest(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates get playlist tracks success action', () => {
    const expectedAction: Action = {type: types.GET_PLAYLIST_TRACKS_SUCCESS};
    expect(actions.getPlaylistTracksSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get playlist tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_PLAYLIST_TRACKS_FAILURE,
      error,
    };

    expect(actions.getPlaylistTracksFailure(error)).toStrictEqual(expectedAction);
  });
});