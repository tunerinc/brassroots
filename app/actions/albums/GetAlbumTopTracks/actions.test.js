'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/albums';

describe('get album top tracks synchronous action creators', () => {
  it('creates get album top tracks request action', () => {
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_TRACKS_REQUEST,
    };

    expect(actions.getAlbumTopTracksRequest()).toStrictEqual(expectedAction);
  });

  it('creates get album top tracks success action', () => {
    const albumID: string = 'foo';
    const trackIDs: Array<string> = ['foo'];
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_TRACKS_SUCCESS,
      albumID,
      trackIDs,
    };

    expect(actions.getAlbumTopTracksSuccess(albumID, trackIDs)).toStrictEqual(expectedAction);
  });

  it('creates get album top tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_TRACKS_FAILURE,
      error,
    };

    expect(actions.getAlbumTopTracksFailure(error)).toStrictEqual(expectedAction);
  });
});