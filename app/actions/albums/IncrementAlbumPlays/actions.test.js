'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/albums';

describe('increment album plays synchronous action creators', () => {
  it('creates increment album plays request action', () => {
    const expectedAction: Action = {
      type: types.INCREMENT_ALBUM_PLAYS_REQUEST,
    };

    expect(actions.incrementAlbumPlaysRequest()).toStrictEqual(expectedAction);
  });

  it('creates increment album plays success action', () => {
    const albumID: string = 'foo';
    const albumCount: number = 1;
    const expectedAction: Action = {
      type: types.INCREMENT_ALBUM_PLAYS_SUCCESS,
      albumID,
      albumCount,
    };

    expect(actions.incrementAlbumPlaysSuccess(albumID, albumCount)).toStrictEqual(expectedAction);
  });

  it('creates increment album plays failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.INCREMENT_ALBUM_PLAYS_FAILURE,
      error,
    };

    expect(actions.incrementAlbumPlaysFailure(error)).toStrictEqual(expectedAction);
  });
});