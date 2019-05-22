'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artist top playlists synchronous action creators', () => {
  it('creates get artist top playlists request action', () => {
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_PLAYLISTS_REQUEST,
    };

    expect(actions.getArtistTopPlaylistsRequest()).toStrictEqual(expectedAction);
  });

  it('creates get artist top playlists success action', () => {
    const artistID: string = 'foo';
    const playlistIDs: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_PLAYLISTS_SUCCESS,
      artistID,
      playlistIDs,
    };

    expect(actions.getArtistTopPlaylistsSuccess(artistID, playlistIDs)).toStrictEqual(expectedAction);
  });

  it('creates get artist top playlists failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_PLAYLISTS_FAILURE,
      error,
    };

    expect(actions.getArtistTopPlaylistsFailure(error)).toStrictEqual(expectedAction);
  });
});