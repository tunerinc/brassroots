'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change theme color synchronous action creators', () => {
  it('creates change theme color request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_THEME_COLOR_REQUEST,
    };

    expect(actions.changeThemeColorRequest()).toStrictEqual(expectedAction);
  });

  it('creates change theme color success action', () => {
    const theme: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_THEME_COLOR_SUCCESS,
      theme,
    };

    expect(actions.changeThemeColorSuccess(theme)).toStrictEqual(expectedAction);
  });

  it('creates change theme color failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_THEME_COLOR_FAILURE,
      error,
    };

    expect(actions.changeThemeColorFailure(error)).toStrictEqual(expectedAction);
  });
});