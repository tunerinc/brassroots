'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/albums';

describe('get album top listeners synchronous action creators', () => {
  it('creates get album top listeners request action', () => {
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_LISTENERS_REQUEST,
    };

    expect(actions.getAlbumTopListenersRequest()).toStrictEqual(expectedAction);
  });

  it('creates get album top listeners success action', () => {
    const albumID: string = 'foo';
    const listeners: Array<string> = ['foo'];
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_LISTENERS_SUCCESS,
      albumID,
      listeners,
    };

    expect(actions.getAlbumTopListenersSuccess(albumID, listeners)).toStrictEqual(expectedAction);
  });

  it('creates get album top listeners failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ALBUM_TOP_LISTENERS_FAILURE,
      error,
    };

    expect(actions.getAlbumTopListenersFailure(error)).toStrictEqual(expectedAction);
  });
});