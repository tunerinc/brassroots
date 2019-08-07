'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('get playlist top tracks synchronous action creators', () => {
  it('creates get playlist top tracks request action', () => {
    const expectedAction: Action = {type: types.GET_PLAYLIST_TOP_TRACKS_REQUEST};
    expect(actions.getPlaylistTopTracksRequest()).toStrictEqual(expectedAction);
  });

  it('creates get playlist top tracks success action', () => {
    const expectedAction: Action = {type: types.GET_PLAYLIST_TOP_TRACKS_SUCCESS};
    expect(actions.getPlaylistTopTracksSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get playlist top tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_PLAYLIST_TOP_TRACKS_FAILURE,
      error,
    };

    expect(actions.getPlaylistTopTracksFailure(error)).toStrictEqual(expectedAction);
  });
});