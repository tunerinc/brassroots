'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change session preference synchronous action creators', () => {
  it('creates change session preference request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_PREFERENCE_REQUEST,
    };

    expect(actions.changeSessionPreferenceRequest()).toStrictEqual(expectedAction);
  });

  it('creates change session preference success action', () => {
    const status: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_PREFERENCE_SUCCESS,
      status,
    };

    expect(actions.changeSessionPreferenceSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change session preference failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_PREFERENCE_FAILURE,
      error,
    };

    expect(actions.changeSessionPreferenceFailure(error)).toStrictEqual(expectedAction);
  });
});