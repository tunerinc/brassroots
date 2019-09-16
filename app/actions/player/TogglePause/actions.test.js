'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('toggle pause synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.TOGGLE_PAUSE_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const status: boolean = true;
    const progress: number = 1000;
    const expectedAction: Action = {
      type: types.TOGGLE_PAUSE_SUCCESS,
      status,
      progress,
    };

    expect(actions.success(status, progress)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.TOGGLE_PAUSE_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});