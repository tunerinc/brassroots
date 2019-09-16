'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('toggle mute synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.TOGGLE_MUTE_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates request action', () => {
    const status: boolean = true;
    const expectedAction: Action = {
      type: types.TOGGLE_MUTE_SUCCESS,
      status,
    };

    expect(actions.success(status)).toStrictEqual(expectedAction);
  });

  it('creates request action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.TOGGLE_MUTE_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});