'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('get user image synchronous action creators', () => {
  it('creates get user image request action', () => {
    const expectedAction: Action = {
      type: types.GET_USER_IMAGE_REQUEST,
    };

    expect(actions.getUserImageRequest()).toStrictEqual(expectedAction);
  });

  it('creates get user image success action', () => {
    const userID: string = 'foo';
    const photo: string = 'foo';
    const expectedAction: Action = {
      type: types.GET_USER_IMAGE_SUCCESS,
      userID,
      photo,
    };

    expect(actions.getUserImageSuccess(userID, photo)).toStrictEqual(expectedAction);
    expect(actions.getUserImageSuccess(userID, null)).toStrictEqual({...expectedAction, photo: null});
  });

  it('creates get user image failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_USER_IMAGE_FAILURE,
      error,
    };

    expect(actions.getUserImageFailure(error)).toStrictEqual(expectedAction);
  });
});