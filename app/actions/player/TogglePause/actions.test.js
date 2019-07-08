'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('toggle pause synchronous action creators', () => {
  it('creates toggle pause request action', () => {
    const expectedAction: Action = {
      type: types.TOGGLE_PAUSE_REQUEST,
    };

    expect(actions.togglePauseRequest()).toStrictEqual(expectedAction);
  });

  it('creates toggle pause success action', () => {
    const status: boolean = true;
    const progress: number = 1000;
    const expectedAction: Action = {
      type: types.TOGGLE_PAUSE_SUCCESS,
      status,
      progress,
    };

    expect(actions.togglePauseSuccess(status, progress)).toStrictEqual(expectedAction);
  });

  it('creates toggle pause failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.TOGGLE_PAUSE_FAILURE,
      error,
    };

    expect(actions.togglePauseFailure(error)).toStrictEqual(expectedAction);
  });
});