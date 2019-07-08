'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('change profile photo synchronous action creators', () => {
  it('creates change profile photo request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_PROFILE_PHOTO_REQUEST,
    };

    expect(actions.changeProfilePhotoRequest()).toStrictEqual(expectedAction);
  });

  it('creates change profile photo success action', () => {
    const photo: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_PROFILE_PHOTO_SUCCESS,
      photo: null,
    };

    expect(actions.changeProfilePhotoSuccess()).toStrictEqual(expectedAction);

    const expectedActionWithPhoto: Action = {
      type: types.CHANGE_PROFILE_PHOTO_SUCCESS,
      photo,
    };

    expect(actions.changeProfilePhotoSuccess(photo)).toStrictEqual(expectedActionWithPhoto);
  });

  it('creates change profile photo failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_PROFILE_PHOTO_FAILURE,
      error,
    };

    expect(actions.changeProfilePhotoFailure(error)).toStrictEqual(expectedAction);
  });
});