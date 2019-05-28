'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('change cover photo synchronous action creators', () => {
  it('creates change cover photo request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_COVER_PHOTO_REQUEST,
    };

    expect(actions.changeCoverPhotoRequest()).toStrictEqual(expectedAction);
  });

  it('creates change cover photo success action', () => {
    const photo: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_COVER_PHOTO_SUCCESS,
      photo: null,
    };

    expect(actions.changeCoverPhotoSuccess()).toStrictEqual(expectedAction);

    const expectedActionWithPhoto: Action = {
      type: types.CHANGE_COVER_PHOTO_SUCCESS,
      photo,
    };

    expect(actions.changeCoverPhotoSuccess(photo)).toStrictEqual(expectedActionWithPhoto);
  });

  it('creates change cover photo failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_COVER_PHOTO_FAILURE,
      error,
    };

    expect(actions.changeCoverPhotoFailure(error)).toStrictEqual(expectedAction);
  });
});