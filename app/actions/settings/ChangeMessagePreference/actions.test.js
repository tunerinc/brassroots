'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change message preference synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.CHANGE_MESSAGE_PREFERENCE_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const message: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_MESSAGE_PREFERENCE_SUCCESS,
      updates: {preference: {message}},
    };

    expect(actions.success(message)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_MESSAGE_PREFERENCE_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});