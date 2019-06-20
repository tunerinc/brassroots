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
    const expectedAction: Action = {
      type: types.GET_ARTIST_IMAGES_REQUEST,
    };

    expect(actions.getArtistImagesRequest()).toStrictEqual(expectedAction);
  });

  it('creates get artist images success action', () => {
    const artists: {
      +[id: string]: Artist,
    } = {
      foo: {
        small: 'foo',
        medium: 'foo',
        large: 'foo',
      },
      bar: {
        small: 'bar',
        medium: 'bar',
        large: 'bar',
      },
    };
    const expectedAction: Action = {
      type: types.GET_ARTIST_IMAGES_SUCCESS,
      artists,
    };

    expect(actions.getArtistImagesSuccess(artists)).toStrictEqual(expectedAction);
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