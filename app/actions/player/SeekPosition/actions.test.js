'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/player';

describe('seek position synchronous action creators', () => {
  it('creates seek position request action', () => {
    const expectedAction: Action = {
      type: types.SEEK_POSITION_REQUEST,
    };

    expect(actions.seekPositionRequest()).toStrictEqual(expectedAction);
  });

  it('creates seek position success action', () => {
    const expectedAction: Action = {
      type: types.SEEK_POSITION_SUCCESS,
    };

    expect(actions.seekPositionSuccess()).toStrictEqual(expectedAction);
  });

  it('creates seek position failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.SEEK_POSITION_FAILURE,
      error,
    };

    expect(actions.seekPositionFailure(error)).toStrictEqual(expectedAction);
  });
});