'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change message preference synchronous action creators', () => {
  it('creates change message preference request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_MESSAGE_PREFERENCE_REQUEST,
    };

    expect(actions.changeMessagePreferenceRequest()).toStrictEqual(expectedAction);
  });

  it('creates change message preference success action', () => {
    const status: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_MESSAGE_PREFERENCE_SUCCESS,
      status,
    };

    expect(actions.changeMessagePreferenceSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change message preference failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_MESSAGE_PREFERENCE_FAILURE,
      error,
    };

    expect(actions.changeMessagePreferenceFailure(error)).toStrictEqual(expectedAction);
  });
});