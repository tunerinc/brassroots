'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artist top albums synchronous action creators', () => {
  it('creates get artist top albums request action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_ALBUMS_REQUEST};
    expect(actions.getArtistTopAlbumsRequest()).toStrictEqual(expectedAction);
  });

  it('creates get artist top albums success action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_TOP_ALBUMS_SUCCESS};
    expect(actions.getArtistTopAlbumsSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get artist top albums failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_ALBUMS_FAILURE,
      error,
    };

    expect(actions.getArtistTopAlbumsFailure(error)).toStrictEqual(expectedAction);
  });
});