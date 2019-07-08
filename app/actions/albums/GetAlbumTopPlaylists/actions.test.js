'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/albums';

describe('get album top playlists synchronous action creators', () => {
  it('creates get album top playlists request action', () => {
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_PLAYLISTS_REQUEST,
    };

    expect(actions.getAlbumTopPlaylistsRequest()).toStrictEqual(expectedAction);
  });

  it('creates get album top playlists success action', () => {
    const albumID: string = 'foo';
    const playlistIDs: Array<string> = ['foo'];
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_PLAYLISTS_SUCCESS,
      albumID,
      playlistIDs,
    };

    expect(actions.getAlbumTopPlaylistsSuccess(albumID, playlistIDs)).toStrictEqual(expectedAction);
  });

  it('creates get album top playlists failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_PLAYLISTS_FAILURE,
      error,
    };

    expect(actions.getAlbumTopPlaylistsFailure(error)).toStrictEqual(expectedAction);
  });
});