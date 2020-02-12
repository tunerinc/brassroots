'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('toggle repeat synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.TOGGLE_REPEAT_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const status: boolean = true;
    const expectedAction: Action = {
      type: types.TOGGLE_REPEAT_SUCCESS,
      status,
    };

    expect(actions.success(status)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.TOGGLE_REPEAT_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});