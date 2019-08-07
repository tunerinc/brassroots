'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {
  type Action,
  type Artist,
} from '../../../reducers/artists';

describe('get artist images synchronous action creators', () => {
  it('creates get artist images request action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_IMAGES_REQUEST};
    expect(actions.getArtistImagesRequest()).toStrictEqual(expectedAction);
  });

  it('creates get artist images success action', () => {
    const expectedAction: Action = {type: types.GET_ARTIST_IMAGES_SUCCESS};
    expect(actions.getArtistImagesSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get artist images failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_IMAGES_FAILURE,
      error,
    };

    expect(actions.getArtistImagesFailure(error)).toStrictEqual(expectedAction);
  });
});