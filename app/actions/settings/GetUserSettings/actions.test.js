'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('get user settings synchronous action creators', () => {
  it('creates get user settings request action', () => {
    const expectedAction: Action = {
      type: types.GET_USER_SETTINGS_REQUEST,
    };

    expect(actions.getUserSettingsRequest()).toStrictEqual(expectedAction);
  });

  it('creates get user settings success action', () => {
    const expectedAction: Action = {
      type: types.GET_USER_SETTINGS_SUCCESS,
    };

    expect(actions.getUserSettingsSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get user settings failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_USER_SETTINGS_FAILURE,
      error,
    };

    expect(actions.getUserSettingsFailure(error)).toStrictEqual(expectedAction);
  });
});